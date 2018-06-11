FROM node:10

RUN mkdir /app
WORKDIR /app

COPY . /app

RUN npm install --production

EXPOSE 5100

CMD ["npm", "start"]