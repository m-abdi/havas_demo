## Start app with docker-compose ##


***replace <ACCESS_TOKEN> with access token of docker hub***
```sh

docker login -u abdimehdi -p <ACCESS_TOKEN> && \
chmod +x ./scripts/startReplicaSetEnvironment.sh && \
chmod +x ./scripts/rs-init.sh && \
./scripts/startReplicaSetEnvironment.sh && \
yarn && yarn prisma generate &&
node src/prepareDatabase.js

```

------
*run this frequently to update your local image*
```sh

docker pull abdimehdi/havas:latest

```
