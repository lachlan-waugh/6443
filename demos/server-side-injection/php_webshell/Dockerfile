# FROM trafex/php-nginx:latest
FROM trafex/alpine-nginx-php7

USER root
RUN echo "COMP6443{PHP_IS_THE_ONLY_LANGUAGE_WORSE_THAN_JS}" > /flag
COPY --chown=nginx /src/* /var/www/html/

USER nobody