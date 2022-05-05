FROM node:16.15.0-alpine3.14

WORKDIR /usr/src/app

COPY package*.json ./

RUN yarn global add rimraf @nestjs/cli
RUN yarn

COPY . .

CMD ["yarn", "start:dev"]
