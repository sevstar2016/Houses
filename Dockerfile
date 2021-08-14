 # syntax=docker/dockerfile:1
FROM node:12
COPY package.json ./
COPY . ./
RUN npm i
RUN npm test