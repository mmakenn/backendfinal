import { SERVER_MODE, PORT } from "./config.js";
import { createCluster } from "./src/cluster.js";
import { createServer } from "./src/server.js";
import { initDatabaseConnection } from './src/controllers/databaseConnectionHandler.js';

initDatabaseConnection()

if (SERVER_MODE === 'cluster') {
    createCluster(PORT)
} else {
    createServer(PORT)
}