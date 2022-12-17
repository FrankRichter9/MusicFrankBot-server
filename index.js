import { createClient } from 'redis';

const client = createClient();

client.on('error', (err) => console.log('Redis Client Error', err));

await client.connect();

// await client.set('key', '123');
// const value = await client.get('key');
// console.log(value)

const subscriber = client.duplicate();
await subscriber.connect();

await subscriber.subscribe('bot', (message) => {
    console.log(message);
});

// await client.disconnect();