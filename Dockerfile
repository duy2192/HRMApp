# build stage
FROM node:16.14-alpine as build-stage
WORKDIR /app
COPY . .
RUN yarn install
RUN yarn global add serve
RUN yarn build

CMD ["yarn", "serve"]