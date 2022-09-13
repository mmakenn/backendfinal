# ------------------------------------------------------------- 
# -------------------     ENVIRONMENT      -------------------- 
## Specify port (8080 by default)
PORT

## DB access
MONGO_LOCAL_PORT
MONGO_USER
MONGO_PASSWORD
MONGO_DATABASE

## To send notifications
SERVER_EMAIL
SERVER_PASSWORD

## To give admin authentication
ADMIN_EMAIL 

## To session handle
SECRET_WORD

# ----------------------- IN PRODUCTION ----------------------- 
# ------------------- Running this server: -------------------- 

## Fork Mod (default):
###   CLI execute:
    node src/main.js --server_mode=fork --deploy_mode=prod
###   or
    npm start

## Cluster Mod:
###   CLI execute:
    node src/main.js --server_mode=cluster --deploy_mode=prod
###   or
    npm run start:cluster

# ----------------------- IN DEVELOPMENT----------------------- 
# ------------------- Running this server: -------------------- 

## Fork Mod (default):
###   CLI execute:
    node src/main.js --server_mode=fork --deploy_mode=devel
###   or
    npm run start:dev

## Cluster Mod:
###   CLI execute:
    node src/main.js --server_mode=cluster --deploy_mode=devel
###   or
    npm run start:devCluster