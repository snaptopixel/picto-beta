const chalk = require('chalk');
const chokidar = require('chokidar');
const fs = require('fs-extra');
const path = require('path');
const cleanup = require('node-cleanup');
const WebSocket = require('ws');
const portfinder = require('portfinder');

const package = fs.readJsonSync('package.json');
const devMode = process.env.NODE_ENV !== 'production';

let firstRun = true;

function log(msg) {
  console.log(chalk.dim('[Picto]\t') + msg);
}

async function startServer(src, dest) {
  portfinder.basePort = 3000;
  portfinder.highestPort = 3333;

  let socketId = new Date().getTime();

  const port = await portfinder.getPortPromise();

  log('socket server: ' + chalk.cyan('http://localhost:' + port));

  const sockets = {};
  const wss = new WebSocket.Server({
    port
  });
  const watcher = chokidar.watch(src + '/pages/**/*.md', {
    persistent: true,
  });

  function sendUpdate(file, data) {
    const payload = JSON.stringify({
      data,
      path: file
    });
    Object.keys(sockets).map(id => sockets[id].send(payload));
  }

  watcher.on('change', file => {
    log('Page updated: ' + chalk.cyan(file.replace(__dirname, '')));
    fs.copySync(file, dest + file.replace(__dirname, ''));
    sendUpdate(file, fs.readFileSync(file).toString())
  });

  wss.on('connection', socket => {
    log('Client connected')
    const id = socketId++;
    sockets[id] = socket;
    socket.on('close', () => {
      delete sockets[id];
    });
  });

  cleanup(() => {
    wss.close();
    watcher.close();
    return true;
  });

  return {
    port,
    sendUpdate
  };
}

let server;

module.exports = function makeRenderer(pictoSrc, pictoDest) {
  pictoSrc = path.resolve(pictoSrc);
  pictoDest = path.resolve(pictoDest);

  return async function docsRenderer(components) {
    if (firstRun) {
      fs.copySync(pictoSrc + '/pages', pictoDest + '/pages');
      if (devMode) {
        server = await startServer(pictoSrc, pictoDest);
      }
    }

    const {
      name,
      description,
      version,
      homepage
    } = package;

    const config = {
      picto: {
        description,
        homepage,
        name,
        port: server ? server.port : null,
        version,
      },
      ...components
    };

    await fs.writeJson(pictoDest + '/config.json', config, {
      spaces: 2
    });

    if (!firstRun && devMode) {
      log('Config updated');
      server.sendUpdate(pictoDest + '/config.json', config);
    }

    firstRun = false;
  }
}