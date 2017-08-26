FROM node:alpine

ENV SCRIPT "console.log('env SCRIPT not defined')"

COPY run.js run.js

ENTRYPOINT ["node","run.js"]
