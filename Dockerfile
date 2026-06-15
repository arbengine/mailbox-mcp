FROM node:22-alpine

WORKDIR /app

COPY package.json server.js ./

CMD ["node", "server.js"]
