import { createJSONCreationError, createJSONUploadOK } from '../misc/serverMessages.js'
import { SERVER_PUBLIC_IMAGE_FOLDER } from '../middlewares/multer.js'
import { uploadAsync } from '../middlewares/multer.js'

export async function controllerUploadImage(req, res, next) {
    try {
        await uploadAsync(req, res)
        resolveUpload(req, res)
    } catch(error) {
        const response = createJSONCreationError("image", error.message)
        res.status(response.status).json(response)
    }
}

export function resolveUpload(req, res) {
    const fileName = req.file ? req.file.filename : null
    if (fileName){
        const response = createJSONUploadOK(SERVER_PUBLIC_IMAGE_FOLDER, fileName)
        res.status(response.status).json(response)
    } else {
        const response = createJSONCreationError("image", "Not filename setted in request.")
        res.status(response.status).json(response)
    }
}