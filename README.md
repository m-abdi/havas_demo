## Start app with docker-compose ##

### Linux ###
***replace <ACCESS_TOKEN> with access token of docker hub***
```sh

docker login -u abdimehdi -p <ACCESS_TOKEN> && \
chmod +x ./scripts/startReplicaSetEnvironment.sh && \
chmod +x ./scripts/rs-init.sh && \
./scripts/startReplicaSetEnvironment.sh && \
yarn && yarn prisma generate &&
node src/prepareDatabase.js

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
yarn prisma generate
```
5.
```cmd
node ./src/prepareDatabase.js
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

m
```sh
mongoresotre --archive=./db-backup.archive
```
