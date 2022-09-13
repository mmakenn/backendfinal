import { controllerPassportRegister, 
        controllerFailRegister, controllerSuccessRegister } from '../controllers/users.js'
import { Router } from 'express'

export const routerUser = new Router()

routerUser.post('/users', controllerPassportRegister)

routerUser.post('/failRegister', controllerFailRegister)

routerUser.post('/successRegister', controllerSuccessRegister)