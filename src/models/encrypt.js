import crypto from "crypto"
import { ClassError, OmmitedFieldError } from "./error.js"

export class Encrypt {
    #salt
    #hash

    constructor(other = undefined) {
        if (other && other instanceof Object) {
            // create a copy of another instance
            if (other.salt) {
                this.setSalt(other.salt)
            } else {
                throw ClassError("Object with attribute 'salt'")
            }
            if (other.hash) {
                this.setPassword(other.hash)
            } else {
                throw ClassError("Object with attribute 'hash'")
            }
        } else {
            // create a new instance
            this.setSalt()
        }
    }

    setSalt(salt) {
        if (!salt) {
            this.#salt = this.#generateSalt()
        } else if (typeof salt === 'string') {
            this.#salt = salt
        } else {
            throw ClassError("String")
        }
    }

    setPassword(password) {
        if (!password) {
            throw OmmitedFieldError("password")
        } else if (typeof password === 'string') {
            this.#hash = this.#generateHash(password)
        } else if (password instanceof Object) {
            this.#hash = Buffer.from(password)
        } else {
            throw ClassError("String or Object where Object.hash is a Buffer")
        }
    }

    #generateHash(password) {
        return crypto.pbkdf2Sync(password, this.#salt, 10000, 512, "sha512")
    }
    
    #generateSalt() {
        return crypto.randomBytes(128).toString("base64")
    }

    checkPassword(password) {
        const encryptPassword = this.#generateHash(password)
        return crypto.timingSafeEqual(this.#hash, encryptPassword)
    }

    getEncryptedObject() {
        return JSON.parse(JSON.stringify({ hash: this.#hash, salt: this.#salt }))
    }
}