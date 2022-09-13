import { Router } from 'express'
import { checkAdminUser, checkAuthUser } from '../middlewares/auth.js'
import { controllerGetAllProducts, controllerGetOneProduct,
    controllerPostProduct, controllerUpdateProduct,
    controllerDeleteProduct } from '../controllers/products.js'

const routerProducts = new Router()

routerProducts.get('/products', controllerGetAllProducts)

routerProducts.get('/products/:id', controllerGetOneProduct)

routerProducts.post('/products', checkAuthUser, checkAdminUser, controllerPostProduct)

routerProducts.put('/products/:id', checkAuthUser, checkAdminUser, controllerUpdateProduct)

routerProducts.delete('/products/:id', checkAuthUser, checkAdminUser, controllerDeleteProduct)

export { routerProducts }