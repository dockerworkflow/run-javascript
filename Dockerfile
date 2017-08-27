FROM node:alpine

ENV SCRIPT "console.log('env SCRIPT not defined')"

COPY run.js run.js
COPY loader.js loader.js
COPY package.json package.json

RUN npm install

ENTRYPOINT ["node","run.js"]
