import { controllerUserLogin,
        controllerFailLogin, controllerSuccessLogin} from '../controllers/login.js'
import { Router } from 'express'

export const routerLogin = new Router()

routerLogin.post('/login', controllerUserLogin)

routerLogin.post('/failLogin', controllerFailLogin)

routerLogin.post('/successLogin', controllerSuccessLogin)


