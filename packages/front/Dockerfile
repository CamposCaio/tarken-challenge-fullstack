FROM node:16.15.0-alpine3.14
WORKDIR /usr/src/app

COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

COPY package*.json ./
RUN yarn

COPY . ./

ENTRYPOINT ["/entrypoint.sh"]

CMD ["yarn", "dev"]
