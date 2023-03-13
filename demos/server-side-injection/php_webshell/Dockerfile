FROM trafex/alpine-nginx-php7

USER root
COPY --chown=nginx /src/* /var/www/html/
RUN echo "COMP6443{PHP_IS_THE_ONLY_LANGUAGE_WORSE_THAN_JS}" > /flag

USER nobody