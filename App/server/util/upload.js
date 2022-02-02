const AWS = require("aws-sdk");
const endpoint = new AWS.Endpoint("https://kr.object.ncloudstorage.com");
const region = "kr-standard";
const path = require("path");
const config = require("../config/key.js");
var multer = require("multer");
var multerS3 = require("multer-s3");
const s3 = new AWS.S3({
  endpoint: endpoint,
  region: region,
  credentials: {
    accessKeyId: config.access_key,
    secretAccessKey: config.secret_key,
  },
});
function setUpload(bucket) {
  var upload = multer({
    storage: multerS3({
      s3: s3,
      bucket: bucket,
      acl: "public-read-write",
      key: function (req, file, cb) {
        let extension = path.extname(file.originalname);
        cb(null, Date.now().toString() + extension);
      },
    }),
  }).single("file");
  return upload;
}

module.exports = setUpload;
