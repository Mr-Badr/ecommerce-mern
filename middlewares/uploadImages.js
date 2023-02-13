const multer = require("multer");
const sharp = require("sharp");
const fs = require("fs");
const path = require("path");
// we need 'path' because first we will upload our images in our local and then to the cloud

const multerStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    // cb is just a callback
    cb(null, path.join(__dirname, "../public/images"));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + ".jpeg");
  },
});

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(
      {
        message: "Unsupported File Format",
      },
      false
    );
  }
};

// we need to set up out multer
const uploadPhoto = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
  limits: { fileSize: 2000000 }, // 2MB
});

// Resize our images
const productImgResize = async (req, res, next) => {
  if (!req.files) {
    next();
  }
  await Promise.all(
    req.files.map(async (file) => {
      await sharp(file.path)
        .resize(300, 300)
        .toFormat("jpeg")
        .jpeg({ quality: 90 })
        .toFile(`public/images/products/${file.filename}`);
      fs.unlinkSync(`public/images/products/${file.filename}`);
    })
  );
  next();
};

const blogImgResize = async (req, res, next) => {
  if (!req.files) {
    next();
  }
  await Promise.all(
    req.files.map(async (file) => {
      await sharp(file.path)
        .resize(300, 300)
        .toFormat("jpeg")
        .jpeg({ quality: 90 })
        .toFile(`public/images/blogs/${file.filename}`);
      fs.unlinkSync(`public/images/blogs/${file.filename}`);
    })
  );
  next();
};

module.exports = { uploadPhoto, productImgResize, blogImgResize };
