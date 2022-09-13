import { Router } from 'express'
import { checkAuthUser } from '../middlewares/auth.js'
import { controllerGetAllProducts, controllerAddProduct, controllerDeleteProduct } from '../controllers/carts.js'


export const routerCarts = new Router()

routerCarts.get('/shoppingcartproducts', checkAuthUser, controllerGetAllProducts)

routerCarts.post('/shoppingcartproducts', checkAuthUser, controllerAddProduct)

routerCarts.delete('/shoppingcartproducts/:id', checkAuthUser, controllerDeleteProduct)