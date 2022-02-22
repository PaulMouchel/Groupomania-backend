import aws from 'aws-sdk'

const s3 = new aws.S3({
  accessKeyId: process.env.S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY
})

export default s3