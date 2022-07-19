

1. docker login -p <ACCESS_TOKEN> 
<!-- DOCKER_ID: abdimehdi -->
2. docker compose up 
3. docker compose exec mongo1 mongosh
4. rs.initiate( {
   _id : "dbrs",
   members: [
      { _id: 0, host: "mongo1:27017" },
      { _id: 1, host: "mongo2:27017" },
      { _id: 2, host: "mongo3:27017" }
   ]
})
5. node ./src/prepareDatabase.js






<!-- result should be:  { ok: 1 } -->