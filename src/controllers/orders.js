import { cartsDAO, ordersDAO } from "../DAOs/DAOs.js"
import { Order } from "../models/order.js"
import { Cart } from "../models/cart.js"
import { sendNotificationNewOrder } from "./notifications.js"
import { createJSONCreationError, createJSONCreationOK, 
        createJSONDatabaseReadError, 
        createJSONReadError, createJSONReadOK } from "../misc/serverMessages.js"

export async function controllerGetAllOrders(req, res, next) {
    const ordersData = await ordersDAO.getByCustomerId(req.user.id)
    const orders = []
    try {
        ordersData.forEach(orderData => {
            const order = new Order(orderData)
            orders.push(order.getData())
        })
    } catch(error) {
        createJSONDatabaseReadError("Order", req.user.id, error.message)
    }
    const response = createJSONReadOK("Order", req.user.id, orders)
    res.status(response.status).json(response)
}

export async function controllerCreateOrder(req, res, next) {
    const cartData = await cartsDAO.getById(req.user.id)
    let products = null
    if (cartData) {
        try {
            const cart = new Cart(cartData)
            products = cart.getProductsList()
            cart.reset()
            cartsDAO.update(cart.getData())
        } catch(error) {
            const response = createJSONDatabaseReadError("Cart", req.user.id, error.message)
            res.status(response.status).json(response)
        }
        try {
            const order = new Order({customerId: req.user.id, productsList: products})
            await ordersDAO.save(order.getData())
            sendNotificationNewOrder(order)
            const response = createJSONCreationOK("Order", order.getId())
            res.status(response.status).json(response)
        } catch(error) {
            const response = createJSONCreationError("Order", error.message)
            res.status(response.status).json(response)
        }
    } else {
        const response = createJSONReadError("Cart", req.user.id)
        res.status(response.status).json(response)
    }
}