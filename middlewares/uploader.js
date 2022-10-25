const multer = require("multer");

const path = require("path");

const uploader = multer({
  dest: "/uploads",
  fileFilter: (req, file, cb) => {
    const supportedImage = /png|jpg/;
    const extension = path.extname(file.originalname);
    if (supportedImage.test(extension)) {
      cb(null, true);
    } else {
      cb(new Error("Must be a png / jpg"));
    }
  },
  limits: {
    fileSize: 5000000,
  },
});

module.exports = uploader;
