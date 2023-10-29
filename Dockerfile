FROM node:18

WORKDIR /be-nc-news

COPY ./package.json .

RUN npm cache clean --force && npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "start"]
