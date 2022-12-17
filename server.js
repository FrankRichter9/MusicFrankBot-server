import { createClient } from 'redis';

const client = createClient();

client.on('error', (err) => console.log('Redis Client Error', err));

await client.connect();

const publisher = client.duplicate();
await publisher.connect();

// await publisher.publish('bot', 'message');
setTimeout(() => {
    publisher.publish('bot', 'https://youtube.com/watch?v=Q8IfcK-BQSQ');
}, 3000)

// await client.disconnect();