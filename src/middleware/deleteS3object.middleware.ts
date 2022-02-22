import s3 from '../config/awsS3'

const deleteS3object = async (imageUrl: string) => {
    const splitedImageUrl = imageUrl.split('/')
    const key = splitedImageUrl[splitedImageUrl.length - 1]

    const params = { 
        Bucket: process.env.S3_BUCKET_NAME, 
        Key: key
    }

    s3.deleteObject(params, (err, data) => {
        if (err) {
            console.log(err, err.stack)
        } else {
            console.log(`${key} deleted`)
        } 
    })
}

export default deleteS3object