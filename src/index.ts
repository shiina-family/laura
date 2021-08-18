import {MyBot} from './bot';

const laura = new MyBot();
export const client = laura.client;

(async () => {
  await laura.loadCogs();
  await laura.login();
})()
