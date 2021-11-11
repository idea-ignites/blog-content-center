# syntax=docker/dockerfile:1

FROM node:16.13.0

WORKDIR /app

COPY . .

RUN cd scripts && npm install
RUN npm install --global typescript
RUN cd scripts && tsc
RUN [ "node", "scripts/traverse-markdown-resources.js" ]
RUN [ "node", "scripts/pre-compile.js" ]

RUN [ "npm", "install" ]
RUN [ "npm", "run", "build" ]
ENV NODE_ENV=production
CMD [ "npm", "run", "start:prod" ]