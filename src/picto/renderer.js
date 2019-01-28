const chalk = require('chalk');
const chokidar = require('chokidar');
const fs = require('fs-extra');
const path = require('path');
const cleanup = require('node-cleanup');
const WebSocket = require('ws');
const portfinder = require('portfinder');

const pictoRoot = path.resolve('docs/build/picto');
const package = fs.readJsonSync('package.json');
let firstRun = true;
const devMode = process.env.NODE_ENV !== 'production';

function log(msg) {
  console.log(chalk.dim('[Picto]\t') + msg);
}

async function startServer() {
  portfinder.basePort = 3000;
  portfinder.highestPort = 3333;

  let socketId = new Date().getTime();

  const port = await portfinder.getPortPromise();

  log('socket server: ' + chalk.cyan('http://localhost:' + port));

  const sockets = {};
  const wss = new WebSocket.Server({
    port
  });
  const watcher = chokidar.watch(__dirname + '/pages/**/*.md', {
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
    fs.copySync(file, pictoRoot + file.replace(__dirname, ''));
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

module.exports = async function docsRenderer(components) {

  if (firstRun) {
    fs.copySync(__dirname + '/pages', pictoRoot + '/pages');
    if (devMode) {
      server = await startServer();
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

  await fs.writeJson(pictoRoot + '/config.json', config, {
    spaces: 2
  });

  if (!firstRun && devMode) {
    log('Config updated');
    server.sendUpdate(pictoRoot + '/config.json', config);
  }

  firstRun = false;
}