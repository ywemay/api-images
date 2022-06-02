const multer = require('multer');
const Model = require('../models/image');
const fs = require('fs');

const uploads  = process.env.UPLOADS || 'uploads';

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    const { scope } = req.body;
    cb(null, `${uploads}/${scope}`);
  },
  filename: function(req, file, cb) {
    const { scope } = req.body;
    const dest = `${uploads}/${scope}/${file.originalname}`;
    cb(null, dest);
  }
});

const fileFilter = (req, file, cb) => {
  const { scope } = req.body;
  const dest = `${uploads}/${scope}`;
  if (!fs.existsSync(dest)) {
    cb(new Error('Failed to upload using scope "' + scope + '"'));
    return;
  }
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});

exports.upload = (req, res, next) => {
  
}