const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
  cloud_name: 'dqzhitag2',
  api_key: '168241733179462',
  api_secret: 'PMGSf-zzv64u8jsgoyb7yIyrONM'
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'MankindMedicare',
    allowed_formats: ['jpg', 'png']
  }
});

const upload = multer({ storage: storage });

module.exports = upload;
