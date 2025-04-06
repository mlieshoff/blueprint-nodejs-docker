FROM node:22-alpine as base
WORKDIR /app
RUN npm init -y

FROM base as build
COPY package.json package-lock.json ./
RUN npm i
COPY . ./
RUN npm run build

USER node
EXPOSE 8080
ENTRYPOINT [ "npm", "start" ]