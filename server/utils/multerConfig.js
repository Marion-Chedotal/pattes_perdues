const multer = require("multer");
const errors = require("../utils/errors.json");

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
      const error = new Error(errors.postForm.badImgFormat);
      error.code = "badImgFormat";
      return cb(error);
    }
    cb(null, true);
  },
}).single("picture");

module.exports = (req, res, next) => {
  upload(req, res, function (err) {
    if (err instanceof Error) {
      return res
        .status(400)
        .json({ errorCode: err.code, errorMessage: err.message });
    } else if (err) {
      return res.status(500).json({ error: "Internal server error" });
    }
    next();
  });
};
