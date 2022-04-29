FROM node:16.15.0-alpine3.15 AS development

WORKDIR /usr/src/app

COPY package*.json ./

RUN yarn global add glob rimraf @nestjs/cli

RUN yarn

COPY . .

RUN yarn build

FROM node:16.15.0-alpine3.15 AS production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./

RUN yarn --prod

COPY . .

COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/main"]
