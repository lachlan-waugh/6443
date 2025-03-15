FROM node:16

WORKDIR /app
COPY ./package*.json /app/
COPY ./app /app/
RUN npm install
EXPOSE 8080

CMD [ "npm", "start" ]
