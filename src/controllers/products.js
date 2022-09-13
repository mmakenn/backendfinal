import { productsDAO } from '../DAOs/DAOs.js'
import { Product } from '../models/product.js'
import { createJSONDatabaseReadError, 
        createJSONCreationOK, createJSONCreationError,
        createJSONDeleteOK, createJSONDeleteError,
        createJSONReadOK, createJSONReadError,
        createJSONUpdateOK, createJSONUpdateError } from '../misc/serverMessages.js'

export async function controllerGetAllProducts(req, res, next) {
    const productsData = await productsDAO.getAll()
    const products = []
    try {
        productsData.forEach(productData => {
            const product = new Product(productData)
            products.push(product.getData())
        })
    } catch(error) {
        const response = createJSONDatabaseReadError("Products", "ALL", error.message)
        res.status(response.status).json(response)
    }
    const response = createJSONReadOK("Products", "ALL", products)
    res.status(response.status).json(response)
}

export async function controllerGetOneProduct(req, res, next) {
    const productData = await productsDAO.getById(req.params.id)
    if (productData) {
        try {
            const product = new Product(productData)
            const response = createJSONReadOK("Product", req.params.id, product.getData())
            res.status(response.status).json(response)
        } catch(error) {
            const response = createJSONDatabaseReadError("Product", req.params.id, error.message)
            res.status(response.status).json(response)
        }
    } else {
        const response = createJSONReadError("Product", req.params.id)
        res.status(response.status).json(response)
    }
}

export async function controllerPostProduct(req, res, next) {
    try {
        const product = new Product(req.body)
        await productsDAO.save(product.getData())
        const response = createJSONCreationOK("Product", product.getId())
        res.status(response.status).json(response)
    } catch(error) {
        const response = createJSONCreationError("Product", error.message)
        res.status(response.status).json(response)
    }
}

export async function controllerUpdateProduct(req, res, next) {
    const productData = await productsDAO.getById(req.params.id)
    let product = null
    let resultData = null
    if (productData) {
        try {
            product = new Product(productData)
        } catch(error) {
            const response = createJSONDatabaseReadError("Product", req.params.id, error.message)
            res.status(response.status).json(response)
        }
        try {
            resultData = validateDataToUpdate(product, req.body)
        } catch(error) {
            const response = createJSONUpdateError("Product", req.params.id)
            res.status(response.status).json(response)
        }
        const result = await productsDAO.update(resultData)
        if (result) {
            const response = createJSONUpdateOK("Product", req.params.id)
            res.status(response.status).json(response)
        } else {
            const response = createJSONUpdateError("Product", req.params.id)
            res.status(response.status).json(response)
        }
    } else {
        const response = createJSONReadError("Product", req.params.id)
        res.status(response.status).json(response)
    }
}

export async function controllerDeleteProduct(req, res, next) {
    const result = await productsDAO.deleteById(req.params.id)
    if (result) {
        const response = createJSONDeleteOK("Product", req.params.id)
        res.status(response.status).json(response)
    } else {
        const response = createJSONDeleteError("Product", req.params.id)
        res.status(response.status).json(response)
    }
}

function validateDataToUpdate(product, newData) {
    try {
        if (newData.name) {
            product.setName(newData.name)
        }
        if (newData.description) {
            product.setDescription(newData.description)
        }
        if (newData.price) {
            product.setPrice(newData.price)
        }
        if (newData.image) {
            product.setImage(newData.image)
        }
        return product.getData()
    } catch(error) {
        // this error will be handled in the next level to response correctly to the server
        throw error
    }
}