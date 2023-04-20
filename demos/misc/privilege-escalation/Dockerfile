FROM ubuntu:20.04

RUN apt-get update && apt-get install cron -y && apt-get install sudo -y && apt-get install vim -y

RUN useradd -ms /bin/bash melon
WORKDIR /home/melon

# anyone can run /bin/env as sudo without a password
RUN echo "melon ALL=(ALL) NOPASSWD: /bin/env" >> /etc/sudoers

# add a root level cronjob which runs as script in /home/melon
RUN echo "* * * * * root /home/melon/runner.sh" >> /etc/crontab
RUN crontab /etc/crontab
RUN ln -s /dev/stdout /var/log/crontab
RUN chmod 0644 /etc/crontab

COPY --chown=melon:melon ./src/runner.sh ./
RUN chmod +x ./runner.sh

CMD ["cron", "-f"]