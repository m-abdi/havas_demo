#!/bin/bash

DELAY=10
export DATABASE_URL=mongodb://mongo1:27017/havas?directConnection=true
docker compose --file docker-compose.yml down
docker rm -f $(docker ps -a -q)
# docker volume rm $(docker volume ls -q)

docker compose --file docker-compose.yml up -d

echo "****** Waiting for ${DELAY} seconds for containers to go up ******"
sleep $DELAY

docker exec mongo1 /scripts/rs-init.sh