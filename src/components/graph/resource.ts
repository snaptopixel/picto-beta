import { cloneDeep, isEqual } from 'lodash-es';

const callbacks: {
  [url: string]: { previousValue?: any; callback: (data: any) => void };
} = {};
let pollInterval: number;

async function checkForUpdates() {
  Object.entries(callbacks).map(async ([url, meta]) => {
    const data = await fetch(url).then(result =>
      url.endsWith('.json') ? result.json() : result.text(),
    );
    if (!isEqual(data, meta.previousValue)) {
      meta.previousValue = typeof data === 'object' ? cloneDeep(data) : data;
      meta.callback(data);
    }
  });
}

// Get a resource and start polling to see if it's changed...
export async function open(url: string, callback: (data: any) => void) {
  const data = await fetch(url).then(result =>
    url.endsWith('.json') ? result.json() : result.text(),
  );
  callback(data);
  callbacks[url] = { callback, previousValue: data };
  if (!pollInterval) {
    pollInterval = setInterval(checkForUpdates, 1500);
  }
  return data;
}

export async function close(url: string) {
  delete callbacks[url];
}
