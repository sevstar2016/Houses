FROM node:12-ubuntu
COPY package.json ./
COPY . ./
RUN npm i
RUN npm test
CMD ["node", "noorsoftbot.js"]