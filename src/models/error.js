export class OmmitedFieldError extends Error {
    constructor(field) {
        super(`Required field "${field}" was ommited.`)
    }
}

export class ValueNaNError extends Error {
    constructor(field) {
        super(`Field "${field}" must be a number.`)
    }
}

export class ValueNotEmailError extends Error {
    constructor(field) {
        super(`Field "${field}" do not contains "@". It must be a valid email.`)
    }
}

export class PhoneCodeAreaError extends Error {
    constructor(field) {
        super(`Field "${field}" must have area code from Argentina (+54).`)
    }
}

export class PhoneLengthError extends Error {
    constructor(field) {
        super(`Field "${field}" must have lenght = 12, acording to mobile phone numbers.`)
    }
}

export class EmptyOrderError extends Error {
    constructor(field) {
        super(`Array "${field}" must have elements.`)
    }
}

export class ClassError extends Error {
    constructor(field) {
        super(`Expected class: "${field}".`)
    }
}