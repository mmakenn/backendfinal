import { createJSONNotImplemented } from '../misc/serverMessages.js'
import logger from '../misc/logger.js'

export function controllerNotImplemented(req, res) {
    const response = createJSONNotImplemented(req.url, req.method)
    logger.warn(response.message)
    res.status(response.status).json(response)
}