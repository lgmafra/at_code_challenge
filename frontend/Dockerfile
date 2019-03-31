FROM yiisoftware/yii2-php:7.1-apache

RUN apt-get update
RUN curl -sL https://deb.nodesource.com/setup_10.x | bash -
RUN apt-get install nodejs -y

RUN npm install --global yarn

RUN mkdir -p /at_challenge/frontend

COPY . /at_challenge/frontend

WORKDIR /at_challenge/frontend

EXPOSE 3000

RUN yarn

CMD [ "yarn", "start" ]