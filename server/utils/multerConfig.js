const multer = require("multer");

const acceptedExtension = ["image/png", "image/jpeg", "image/jpg"];
const maxSize = 1048576; // 1Mo 

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: maxSize,
  },
  fileFilter: (req, file, cb) => {
    if (!acceptedExtension.includes(file.mimetype)) {
      cb(null, false);
      return cb(
        new Error("Only .png, .jpg and .jpeg format allowed !")
      );
    }
    cb(null, true);
  },
});

module.exports = upload;
