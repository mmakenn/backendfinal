import { controllerUploadImage } from '../controllers/images.js'
import { Router } from 'express'

export const routerImages = new Router()

routerImages.post('/images', 
    controllerUploadImage
)