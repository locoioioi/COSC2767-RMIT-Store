const AWS = require('aws-sdk');

const keys = require('../config/keys');

// This function uploads an image to an AWS S3 bucket.
// It takes an image object as an argument and returns the image URL and key if the upload is successful.
exports.s3Upload = async image => {
  try {
    let imageUrl = '';
    let imageKey = '';

    if (!keys.aws.accessKeyId) {
      console.warn('Missing aws keys');
    }

    if (image) {
      const s3bucket = new AWS.S3({
        accessKeyId: keys.aws.accessKeyId,
        secretAccessKey: keys.aws.secretAccessKey,
        region: keys.aws.region
      });

      const params = {
        Bucket: keys.aws.bucketName,
        Key: image.originalname,
        Body: image.buffer,
        ContentType: image.mimetype
      };

      const s3Upload = await s3bucket.upload(params).promise();

      imageUrl = s3Upload.Location;
      imageKey = s3Upload.key;
    }

    return { imageUrl, imageKey };
  } catch (error) {
    return { imageUrl: '', imageKey: '' };
  }
};
