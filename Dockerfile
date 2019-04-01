FROM yiisoftware/yii2-php:7.1-apache

RUN apt-get update
RUN curl -sL https://deb.nodesource.com/setup_10.x | bash -
RUN apt-get install nodejs -y

RUN npm install --global yarn

RUN mkdir -p /at_challenge/frontend

COPY ./frontend/package.json /at_challenge/frontend
COPY ./frontend/package-lock.json /at_challenge/frontend

COPY ./frontend /at_challenge/frontend

WORKDIR /at_challenge/frontend

RUN yarn 