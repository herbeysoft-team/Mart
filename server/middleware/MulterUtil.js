// multerConfig.js
const multer = require("multer");

// Multer configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);

    cb(null, uniqueSuffix + ".jpeg");
  },
});

// Create a Multer instance
const upload = multer({ storage: storage });


// Multer middleware function
function multerMiddleware(req, res, next) {
  upload.single("file")(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      console.log("Multer Error:", err);
    } else if (err) {
     
      console.log("Other Error:", err);
    }
    next();
  });
}

function multerMultipleMiddleware(req, res, next) {
  upload.array("files")(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      console.log('Multer Error:', err);
      return res.status(400).json({ message: 'Multer error' });
    } else if (err) {
      console.log('Other Error:', err);
      return res.status(500).json({ message: 'Server error' });
    }

    try {
      // Access the uploaded files
      const files = req.files;

      //console.log('Received files:', files); // Log received files for inspection

      next();
    } catch (error) {
      console.log('Processing Error:', error);
      return res.status(500).json({ message: 'Error processing files' });
    }
  });
}


module.exports = {
  upload,
  multerMiddleware,
  multerMultipleMiddleware,
};
