import { Router } from 'express'
import { checkAuthUser } from '../middlewares/auth.js'
import { controllerGetAllOrders, controllerCreateOrder } from '../controllers/orders.js'

export const routerOrders = new Router()

routerOrders.get('/orders', checkAuthUser, controllerGetAllOrders)

routerOrders.post('/orders', checkAuthUser, controllerCreateOrder)
