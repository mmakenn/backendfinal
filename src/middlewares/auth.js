import { adminEmail } from '../../config.js'
import { userPermissionError, adminPermissionError } from '../misc/serverMessages.js'

export function checkAuthUser(req, res, next) {
    if (req.isAuthenticated()){
        next()
    } else {
        res.status(userPermissionError.status).json(userPermissionError)
    }
}

export function checkAdminUser(req, res, next) {
    if (req.user.username === adminEmail){
        next()
    } else {
        res.status(adminPermissionError.status).json(adminPermissionError)
    }
}