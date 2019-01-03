const AWS = require('aws-sdk')
AWS.config.update({
  accessKeyId: process.env.AWS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: 'eu-west-1'
})
const s3 = new AWS.S3()
const params = {
  Bucket: 'ace-my-order',
  Delimiter: ''
}

exports.handler = (event, context, callback) => {
  s3.listObjects(params, (err, data) => {
    callback(null, {
      statusCode: 200,
      body: JSON.stringify(data)
    })
  })
}
