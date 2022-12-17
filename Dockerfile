FROM node

WORKDIR /app

COPY . .

RUN npm ci

CMD ["node", "express.js"]