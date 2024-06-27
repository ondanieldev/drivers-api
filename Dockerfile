FROM node:18-alpine

ARG REST_API_PORT=3000

WORKDIR /api

COPY package.json ./
COPY yarn.lock ./
RUN yarn

COPY . .
RUN yarn build

EXPOSE $REST_API_PORT

CMD ["yarn", "run:prod"]
