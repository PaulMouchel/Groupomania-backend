import { Request } from "express"
// import aws from 'aws-sdk'
import multer from "multer"
import multerS3 from "multer-s3"
import s3 from '../config/awsS3'

// const s3 = new aws.S3({
//     accessKeyId: process.env.S3_ACCESS_KEY_ID,
//     secretAccessKey: process.env.S3_SECRET_ACCESS_KEY
// })

type MetadataCallback = (error: Error | null, metadata: any) => void
type KeyCallback = (error: Error | null, key: string) => void

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: process.env.S3_BUCKET_NAME,
        metadata: function (req:Request, file:Express.Multer.File, callback:MetadataCallback) {
            callback(null, {fieldName: file.fieldname})
        },
        key: function (req:Request, file:Express.Multer.File, callback:KeyCallback) {
            callback(null, Date.now().toString())
        }
    })
})
  
  export default upload.single('image')