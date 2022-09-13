import { cartsDAO, productsDAO } from "../DAOs/DAOs.js"
import { Cart } from "../models/cart.js"
import { Product } from "../models/product.js"
import { createJSONDatabaseReadError, 
        createJSONReadError, createJSONReadOK,
        createJSONUpdateError, createJSONUpdateOK } from "../misc/serverMessages.js"

export async function controllerGetAllProducts(req, res, next) {
    const cart = await resolveGetCartForUser(req.user.id)
    const response = createJSONReadOK("Cart", req.user.id, cart.getProductsList())
    res.status(response.status).json(response)
}

export async function controllerAddProduct(req, res, next) {
    const productData = await productsDAO.getById(req.body.productId)
    if (productData) {
        const cart = await resolveGetCartForUser(req.user.id)
        try {
            const product = new Product(productData)
            cart.setProduct(product)
        } catch(error) {
            const response = createJSONDatabaseReadError("Product", req.params.id, error.message)
            res.status(response.status).json(response)
        }
        const result = cartsDAO.update(cart.getData())
        if (result) {
            const response = createJSONUpdateOK("Cart", req.user.id)
            res.status(response.status).json(response)
        } else {
            const response = createJSONUpdateError("Cart", req.user.id)
            res.status(response.status).json(response)
        }
    } else {
        const response = createJSONUpdateError("Product", req.body.productId)
        res.status(response.status).json(response)
    }
}

export async function controllerDeleteProduct(req, res, next) {
    const productData = await productsDAO.getById(req.params.id)
    if (productData) {
        const cart = await resolveGetCartForUser(req.user.id)
        try {
            const product = new Product(productData)
            cart.delete(product)
        } catch(error) {
            const response = createJSONDatabaseReadError("Product", req.params.id, error.message)
            res.status(response.status).json(response)
        }
        const result = cartsDAO.update(cart.getData())
        if (result) {
            const response = createJSONUpdateOK("Cart", req.user.id)
            res.status(response.status).json(response)
        } else {
            const response = createJSONUpdateError("Cart", req.user.id)
            res.status(response.status).json(response)
        }
    } else {
        const response = createJSONReadError("Product", req.params.id)
        res.status(response.status).json(response)
    }
}

async function resolveGetCartForUser(id) {
    const cartData = await cartsDAO.getById(id)
    let cart = new Cart( { id: id } )
    if (cartData) {
        try {
            cart = new Cart(cartData)
        } catch(error) {
            createJSONDatabaseReadError("Cart", id, error.message)
        }
    } else {
        await cartsDAO.save(cart.getData())
    }
    return cart
}