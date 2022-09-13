import multer from 'multer'
import path from 'path'
import { v4 as uuidv4 } from 'uuid'

const FORM_IMAGE_INPUT = 'image'
export const SERVER_PUBLIC_IMAGE_FOLDER = '/public/uploads'

function defineFileExtention(fileMimeType) {
    const mimetype = fileMimeType.split('/')
    return mimetype.pop()
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.resolve() + SERVER_PUBLIC_IMAGE_FOLDER)
    },
    filename: (req, file, cb) => {
        let date = new Date()
        date = date.getTime()
        const imageId = uuidv4()
        const ext = defineFileExtention(file.mimetype)
        cb(null, `${file.fieldname}-${date}-${imageId}.${ext}`)
    }
})

const upload = multer({ storage: storage })

const uploadFile = upload.single(FORM_IMAGE_INPUT)

export async function uploadAsync(req, res) {
    return new Promise((resolve, reject) => {
        uploadFile(req, res, async (err) => {
            if(err !== undefined) {
                return reject(err);
            }
            resolve();
        })
    })
}