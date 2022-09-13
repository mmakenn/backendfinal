import { ValueNotEmailError, OmmitedFieldError } from "./error.js"

export class ChatMessage {
    #email
    #date
    #text

    constructor({ email, text }) {
        this.setEmail(email)
        this.setText(text)
        this.#date = new Date()
    }

    setEmail(email) {
        if (!email) throw new OmmitedFieldError('email')
        if (!email.includes("@")) throw new ValueNotEmailError('email')
        this.#email = email
    }

    setText(text) {
        if (!text) throw OmmitedFieldError("password")
        this.#text = text
    }

    getData() {
        return Object.freeze(JSON.parse(JSON.stringify({
            email: this.#email,
            date: this.#date.toLocaleString(),
            text: this.#text
        })))
    }
}