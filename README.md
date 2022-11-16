## Start app with docker-compose ##

### Linux ###
***replace <ACCESS_TOKEN> with access token of docker hub***
```sh

docker login -u abdimehdi -p <ACCESS_TOKEN> && \
chmod +x ./scripts/start.sh && \
chmod +x ./scripts/rs-init.sh && \
sudo systemctl restart docker.service && \
./scripts/start.sh

```

### Windows ###
***replace <ACCESS_TOKEN> with access token of docker hub***

1. 
```cmd
docker login -p <ACCESS_TOKEN>
```
2.
```cmd
docker compose up
```
3. 
```cmd
docker compose exec mongo1 mongosh
```
4. 
```cmd
rs.initiate( { _id : "dbrs", members: [ { _id: 0, host: "mongo1:27017" }, { _id: 1, host: "mongo2:27017" }, { _id: 2, host: "mongo3:27017" } ] })
```
output: { ok: 1 }

5.
```cmd
docker container restart havas-initialization
```



------
*run this frequently to update your local image*
```sh

docker pull abdimehdi/havas:latest

```

## Backup database ##


```sh
docker exec mongo1 sh -c 'exec mongodump -d havas --archive'> ./db-backup.archive
```

## Restore database ##

```sh
mongoresotre --archive=./db-backup.archive
```

## Save logs in a file

```sh
docker logs nextjs >> ./logs/logs.log
```