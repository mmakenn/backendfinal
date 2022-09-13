import { SERVER_MODE, PORT } from "../config.js";
import { createCluster } from "./cluster.js";
import { createServer } from "./server.js";
import { initDatabaseConnection } from './controllers/databaseConnectionHandler.js';

initDatabaseConnection()

if (SERVER_MODE === 'cluster') {
    createCluster(PORT)
} else {
    createServer(PORT)
}