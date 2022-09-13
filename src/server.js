/* Server */
import express from 'express';
import { Server as HttpServer } from 'http'
import { Server as IOServer } from 'socket.io'

import { closeDatabaseConnection } from './controllers/databaseConnectionHandler.js';
/* Handlebars engine views */
import Handlebars from 'express-handlebars'
import { handlebarsConfig } from '../config.js';
/* Session and Passport for authentication */
import { sessionHandler } from './middlewares/session.js'
import { passportAuthentication, passportSession} from './middlewares/passport.js';
/* Routers */
import { routerCarts } from './routers/carts.js';
import { routerImages } from './routers/images.js';
import { routerInfo } from './routers/info.js';
import { routerLogin } from './routers/login.js';
import { routerNotImplemented } from './routers/notImplemted.js';
import { routerOrders } from './routers/orders.js';
import { routerProducts } from './routers/products.js';
import { routerUser } from './routers/users.js';
import { emitChat } from './controllers/chat.js';
/* Logger */
import logger from './misc/logger.js';

export function createServer(port) {
    const app = express()

    /* WebSocket */
    const httpServer = new HttpServer(app)
    const io = new IOServer(httpServer)

    io.on('connection', (socket) => {
        logger.info("Conexion con el cliente establecida.")
        emitChat(socket, io.sockets)
    })

    /* Middlewares */
    app.use(express.json())
    app.use(express.urlencoded( { extended: true } ))
    app.use(express.static('public'))

    app.use(sessionHandler)
    
    app.use(passportAuthentication)
    app.use(passportSession)

    /* Handlebars */
    app.engine('.hbs', Handlebars.engine(handlebarsConfig))
    app.set('view engine', '.hbs')
    app.set('views', './src/views')
    
    /* Routers */
    app.use('/', routerLogin)
    app.use('/info', routerInfo)
    app.use('/api', routerImages)
    app.use('/api', routerUser)
    app.use('/api', routerProducts)
    app.use('/api', routerCarts)
    app.use('/api', routerOrders)
    app.use('/', routerNotImplemented)

    /* Connect */
    const connectedServer = httpServer.listen(port, () => {
        logger.info(`Servidor http escuchando en el puerto ${connectedServer.address().port}`)
    })
    
    connectedServer.on('error', error => {
        closeDatabaseConnection()
        logger.error(`Error en servidor ${error}`)
    })
}