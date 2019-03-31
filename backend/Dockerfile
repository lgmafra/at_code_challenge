FROM yiisoftware/yii2-php:7.1-apache

WORKDIR /app

RUN chmod 755 /app

COPY . /app

EXPOSE 80

# RUN php yii migrate --interactive=0
# CMD [ "php", "yii", "migrate", "--interactive=0" ]
ENTRYPOINT ["sh", "-c", "php yii migrate --interactive=0"]
