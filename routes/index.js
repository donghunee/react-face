var express = require('express');
var router = express.Router();
var request = require('request')
var multer = require('multer')
var storage = multer.memoryStorage()
const naver = require('../config/naver')
var upload = multer({ 
  storage: storage,
  // limits: {
  //   fileSize: 2097152,
  // },

 })

/* GET home page. */
router.post('/images',upload.single('image'), function(req, res, next) {
  let image = req.file
  if (image.size > 2097152) {
    res.status(409).json({
      message:"file size too big",
      data:{

      }
    })
    return
  }
  const options = {
    uri: 'https://openapi.naver.com/v1/vision/celebrity',
    method: 'POST',
    headers:{
      'Content-Type':'multipart/form-data',
      'X-Naver-Client-Id': naver.client_id,
      'X-Naver-Client-Secret': naver.client_secret,
    },
    formData: {
      image:'image',
      image: image.buffer
    }
  }
  encodeURIComponent
  request(options, function (error, response, body) {
    if (response.statusCode == 200) {
      const data = JSON.parse(body)
      const option = {
        uri:'https://openapi.naver.com/v1/search/image?query='+encodeURI(data.faces[0].celebrity.value ,"UTF-8")+'&display=1&start=1&sort=sim&filter=large',
        method: 'GET',
        headers: {
          'X-Naver-Client-Id': naver.client_id,
          'X-Naver-Client-Secret': naver.client_secret,
        },
      }
      request(option, function (error, respo, body) {
        if (!error) {
          res.status(200).json({
            message:"success",
            data:{
              image: JSON.parse(body).items[0].thumbnail,
              value: data.faces[0].celebrity.value,
              accuracy : data.faces[0].celebrity.confidence
            }
          })
        } else {
          res.status(500).json({
            message:"server err",
            data:error
          })
        }
      })
    } else {
      res.status(500).json({
        message:"server err",
        data:{
         }
      })
    }
  })

});

module.exports = router;
