import { createClient, RedisClient } from "redis";

export const connect = (url: string) => {
  let client: RedisClient;

  try {
    client = createClient(url);

    client.on('connect', () => {
      console.log('connected to redis')
    });

    client.on('error', (error) => {
      console.log('redis on error', error);
    });
  } catch (e) {
    console.error('redis error', e);

    throw e;
  }

  return client;
};
