FROM node:16-alpine
ARG SLACK_WEBHOOK_URL
ARG SCRAPE_URL
ARG MONGO_URL

ENV SLACK_WEBHOOK_URL=$SLACK_WEBHOOK_URL
ENV SCRAPE_URL=$SCRAPE_URL
ENV MONGO_URL=$MONGO_URL

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --production

COPY . .

entrypoint [ "yarn", "start" ]