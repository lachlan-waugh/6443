FROM node:16

RUN sudo apt install cowsay

WORKDIR /app
COPY ./app/package*.json /app/
COPY ./app /app/
RUN npm install
EXPOSE 8080

CMD [ "npm", "start" ]
