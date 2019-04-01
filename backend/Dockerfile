FROM yiisoftware/yii2-php:7.1-apache

WORKDIR /app

RUN chmod 755 /app

COPY . /app

RUN composer install

RUN composer update

EXPOSE 80

RUN php yii migrate --interactive=0
