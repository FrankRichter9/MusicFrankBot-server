import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'

import { createClient } from 'redis';
console.log('process.env.REDIS_HOST', process.env.REDIS_HOST)
const client = createClient({ url: 'redis://redis:6379' });

client.on('error', (err) => console.log('Redis Client Error', err));

await client.connect();

const publisher = client.duplicate();
await publisher.connect();

const app = express()

app.use(cors())

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.post('/', async function (req, res) {
  console.log(req.body)

  const url = req.body?.url

  if(!url) {
      return
  }
  publisher.publish('bot', url);
  res.send('ok')
})

app.post('/search-videos', async function (req, res) {
    console.log(req.body)

    const search = req.body?.search

    if(!search) {
        return
    }
    const videosArr = await videos(search)
    res.send(videosArr)
})

app.post('/skip', async function (req, res) {
    console.log(req.body)

    publisher.publish('bot', 'skip');
    res.send('ok')
})

import yts from 'yt-search'

async function videos(search) {
    const result = await yts(search)

    return result.videos.slice(0, 5)
}

app.listen(4000)