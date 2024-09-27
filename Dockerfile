FROM node:18-alpine

WORKDIR /var/www

COPY package*.json ./

RUN npm install

COPY . /var/www/

CMD [ "npm", "start" ]