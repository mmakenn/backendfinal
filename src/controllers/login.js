import passport from 'passport'
import { loginError, loginOK } from '../misc/serverMessages.js'

export const controllerUserLogin = passport.authenticate('login', { 
    failureRedirect: '/failLogin',
    successRedirect: '/successLogin'
})

export function controllerFailLogin(req, res) {
    res.status(loginError.status).json(loginError)
}

export function controllerSuccessLogin(req, res) {
    res.status(loginOK.status).json(loginOK)
}