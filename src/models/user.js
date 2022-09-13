import { v4 as uuidv4 } from 'uuid'
import { Encrypt } from "./encrypt.js"
import { OmmitedFieldError, ValueNotEmailError, ValueNaNError, PhoneCodeAreaError, PhoneLengthError } from "./error.js"

export class User {
    #id
    #email // field "user" to  login
    #password // to  login
    #name
    #lastname
    #phone
    #image

    constructor({ id, email, password, name, lastname, phone, image }) {
        this.setId(id)
        this.setEmail(email)
        this.setPassword(password)
        this.setName(name)
        this.setLastname(lastname)
        this.setPhone(phone)
        this.setImage(image)
    }

    /* ------------------------------------------------------------------------- */
    /* -------------------------------- Setters -------------------------------- */
    setId(id) {
        this.#id = id ?? uuidv4()
    }

    setEmail(email) {
        if (!email) throw new OmmitedFieldError('email')
        if (!email.includes("@")) throw new ValueNotEmailError('email')
        this.#email = email
    }

    setPassword(password) {
        if (!password) throw new OmmitedFieldError('password')
        if (typeof password === 'string') {
            const encrypt = new Encrypt()
            encrypt.setPassword(password)
            this.#password = encrypt
        } else {
            this.#password = new Encrypt(password)
        }
    }

    setName(name) {
        if (!name) throw new OmmitedFieldError('name')
        this.#name = name
    }

    setLastname(lastname) {
        if (!lastname) throw new OmmitedFieldError('lastname')
        this.#lastname = lastname
    }

    setPhone(phone) {
        if (!phone) throw new OmmitedFieldError('phone')
        let evalPhone = phone
        if (phone[0] === '+') {
            evalPhone = phone.slice(1)
        }
        let codeArea = evalPhone.slice(0, 2)
        if (codeArea != '54') throw new PhoneCodeAreaError('phone')
        if (evalPhone.length != 12) throw new PhoneLengthError('phone')
        evalPhone = parseInt(evalPhone)
        if (isNaN(evalPhone) || evalPhone < 0) throw new ValueNaNError('phone')

        this.#phone = phone
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

    getEmail() {
        return this.#email
    }

    checkPassword(password) {
        return this.#password.checkPassword(password)
    }

    getName() {
        return this.#name
    }

    getLastname() {
        return this.#lastname
    }

    getPhone() {
        return this.#phone
    }

    getImage() {
        return this.#image
    }

    getData() {
        let data = JSON.parse(JSON.stringify({
            id: this.#id,
            email: this.#email,
            name: this.#name,
            lastname: this.#lastname,
            phone: this.#phone,
            image: this.#image
        }))
        data.password = this.#password.getEncryptedObject()
        return Object.freeze(data)
    }
}