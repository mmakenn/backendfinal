import { v4 as uuidv4 } from 'uuid'
import { OmmitedFieldError, ValueNaNError, ClassError } from "./error.js"

export class Product {
    #id
    #name
    #description
    #price
    #image

    constructor({ id, name, description, price, image }) {
        this.setId(id)
        this.setName(name)
        this.setDescription(description)
        this.setPrice(price)
        this.setImage(image)
    }

    /* ------------------------------------------------------------------------- */
    /* -------------------------------- Setters -------------------------------- */
    setId(id) {
        this.#id = id ?? uuidv4()
    }

    setName(name) {
        if (!name) throw new OmmitedFieldError('name')
        this.#name = name
    }

    setDescription(description) {
        if (!description) throw new OmmitedFieldError('description')
        this.#description = description
    }

    setPrice(price) {
        if (!price) throw new OmmitedFieldError('price')
        if (isNaN(price) || price < 0) throw new ValueNaNError('price')
        this.#price = price
    }

    setImage(image) {
        if (!image) throw new OmmitedFieldError('image')
        this.#image = image
    }

    /* ------------------------------------------------------------------------- */
    /* -------------------------------- Getters -------------------------------- */
    getId() {
        return this.#id
    }

    getName() {
        return this.#name
    }

    getDescription() {
        return this.#description
    }

    getPrice() {
        return this.#price
    }

    getImage() {
        return this.#image
    }

    getData() {
        return Object.freeze(JSON.parse(JSON.stringify({
            id: this.#id,
            name: this.#name,
            description: this.#description,
            price: this.#price,
            image: this.#image,
        })))
    }

    equals(product) {
        if (! product instanceof Product) throw ClassError('Product')
        return this.#id === product.getId()
    }
}