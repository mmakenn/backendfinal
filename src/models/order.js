import { v4 as uuidv4 } from 'uuid'
import { OmmitedFieldError, EmptyOrderError, ClassError } from "./error.js"

export class Order {
    #id
    #date
    #customerId
    #productsList

    constructor({ id, customerId, productsList }) {
        this.setId(id)
        this.#date = new Date()
        this.setCustomerId(customerId)
        this.setProductsList(productsList) // it must be given by Cart
    }

    /* ------------------------------------------------------------------------- */
    /* -------------------------------- Setters -------------------------------- */
    setId(id) {
        this.#id = id ?? uuidv4()
    }

    setCustomerId(customerId) {
        if (!customerId) throw new OmmitedFieldError('customerId')
        this.#customerId = customerId
    }

    setProductsList(productsList) {
        if (!productsList) throw new OmmitedFieldError('productsList')
        if (! productsList instanceof Array) throw new ClassError('Array')
        if (productsList.length === 0) throw new EmptyOrderError('productsList')
        this.#productsList = productsList
    }

    /* ------------------------------------------------------------------------- */
    /* -------------------------------- Getters -------------------------------- */
    getId() {
        return this.#id
    }

    getDate() {
        return this.#date
    }

    getCustomerId() {
        return this.#customerId
    }

    getProductsList() {
        return this.#productsList
    }

    getData() {
        return Object.freeze(JSON.parse(JSON.stringify({
            id: this.#id,
            customerId: this.#customerId,
            date: this.#date,
            productsList: this.#productsList
        })))
    }
}