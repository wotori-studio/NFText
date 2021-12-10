FROM node:lts-alpine3.13

WORKDIR /app
ADD . /app/
RUN npm install

CMD ["yarn", "dev"]
