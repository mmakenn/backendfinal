import { ClassError, OmmitedFieldError, ValueNaNError } from "./error.js"
import { Product } from "./product.js"

export class Cart {
    #id
    #productsList

    constructor({ id, products }) {
        this.setId(id)
        this.#productsList = []  // [ { Product(), cant: 2 }, { Product(), cant: 5 } ]
        if (products) {
            products.forEach(productAndQuantity => {
                const productData = {
                    product: new Product(productAndQuantity.product),
                    quantity: productAndQuantity.quantity
                }
                this.#productsList.push(productData)
            })
        }
    }

    /* ------------------------------------------------------------------------- */
    /* -------------------------------- Setters -------------------------------- */
    setId(id) {
        if (!id) throw new OmmitedFieldError('id')
        this.#id = id
    }

    setProduct(product) {
        if (! product instanceof Product) throw new ClassError('Product')

        const quantity = 1
        let found = false
        this.#productsList.forEach(saved => {
            const productSaved = saved.product
            if (productSaved.equals(product)) {
                saved.quantity += quantity
                found = true
            }
        })

        if (!found) {
            this.#productsList.push( { product: product, quantity: quantity } )
        }
    }

    delete(product) {
        if (! product instanceof Product) throw new ClassError('Product')
        
        const quantity = 1
        let index = -1
        let currentIndex = 0
        this.#productsList.forEach(saved => {
            if (saved.product.equals(product)) {
                saved.quantity -= quantity
                if (saved.quantity === 0) {
                    index = currentIndex
                }
            } else{
                currentIndex++
            }
        })
        if (index != -1) {
            this.#productsList.splice(index, 1)
        }
    }

    reset() {
        this.#productsList = []
    }

    /* ------------------------------------------------------------------------- */
    /* -------------------------------- Getters -------------------------------- */
    getId() {
        return this.#id
    }

    getProductsList() {
        let response = []
        this.#productsList.forEach(productAndQuantity => {
            const revealData = {
                product: productAndQuantity.product.getData(),
                quantity: productAndQuantity.quantity
            }
            response.push(revealData)
        })
        return response
    }

    getData() {
        const revealProductList = this.getProductsList()
        return Object.freeze(JSON.parse(JSON.stringify({
            id: this.#id,
            productsList: revealProductList
        })))
    }
}