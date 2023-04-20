#!/bin/bash
docker build -t privesc . && docker run -dit privesc
docker exec --user melon -it $(docker ps | grep privesc | cut -f1 -d" ") /bin/bash