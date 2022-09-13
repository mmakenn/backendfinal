import { controllerNotImplemented } from '../controllers/notImplemented.js'
import { Router } from 'express'

export const routerNotImplemented = new Router()

routerNotImplemented.get('*', controllerNotImplemented)

routerNotImplemented.post('*', controllerNotImplemented)

routerNotImplemented.delete('*', controllerNotImplemented)

routerNotImplemented.put('*', controllerNotImplemented)