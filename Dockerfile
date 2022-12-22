FROM --platform=linux/amd64 node:19

WORKDIR /app

COPY . .

RUN npm ci

CMD ["node", "express.js"]