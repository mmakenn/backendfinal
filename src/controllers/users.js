import passport from 'passport'
import { createJSONCreationOK, registerError } from '../misc/serverMessages.js'

export const controllerPassportRegister = passport.authenticate('register', { 
    failureRedirect: '/api/failRegister', 
    successRedirect: '/api/successRegister'
}) 

export function controllerFailRegister(req, res, next) {
    res.status(registerError.status).json(registerError)
}

export function controllerSuccessRegister(req, res, next) {
    const response = createJSONCreationOK("User", req.user.id)
    res.status(response.status).json(response)
}