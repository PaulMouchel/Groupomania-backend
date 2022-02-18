import { Request } from "express"
import multer from "multer"

const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
}

type DestinationCallback = (error: Error | null, destination: string) => void
type FileNameCallback = (error: Error | null, filename: string) => void

const storage = multer.diskStorage({
    destination: (
        req: Request, 
        file:Express.Multer.File, 
        callback: DestinationCallback
    ) => {
        callback(null, 'images')
    },
    filename: (
        req: Request, 
        file:Express.Multer.File, 
        callback: FileNameCallback
    ) => {
        const name = file.originalname.split(' ').join('_')
        const extension = MIME_TYPES[file.mimetype];
        callback(null, name + Date.now() + '.' + extension)
    }
})

export default multer({storage: storage}).single('image')