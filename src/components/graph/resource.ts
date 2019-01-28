import { cloneDeep, isEqual } from 'lodash-es';

let connected = false;

function log(msg: string) {
  // tslint:disable-next-line
  console.log(
    '%cPicto',
    'background: #3273dc; color: white; vertical-align: text-bottom; border-radius: 4px; padding: 2px 4px;',
    msg,
  );
}

function openConnection(port: number) {
  if (connected) {
    return;
  }
  connected = true;
  const ws = new WebSocket('ws://localhost:' + port);
  ws.onopen = f => {
    log('Connected to server');
  };
  ws.onmessage = event => {
    const message = JSON.parse(event.data);
    Object.entries(callbacks).map(async ([url, meta]) => {
      if (message.path.includes(url)) {
        log(`File updated: ${url}`);
        if (!isEqual(message.data, meta.previousValue)) {
          meta.previousValue =
            typeof message.data === 'object'
              ? cloneDeep(message.data)
              : message.data;
          meta.callback(message.data);
        }
      }
    });
    return false;
  };
}

const callbacks: {
  [url: string]: { previousValue?: any; callback: (data: any) => void };
} = {};

// Get a resource and start polling to see if it's changed...
export async function open(url: string, callback: (data: any) => void) {
  const data = await fetch(url).then(result =>
    url.endsWith('.json') ? result.json() : result.text(),
  );
  if (data.picto && data.picto.port) {
    openConnection(data.picto.port);
  }
  callback(data);
  const id = url.slice(url.indexOf('/picto')).replace('//', '/');
  callbacks[id] = {
    callback,
    previousValue: data,
  };
  return data;
}

export async function close(url: string) {
  delete callbacks[url];
}
