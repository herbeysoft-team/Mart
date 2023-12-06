// multerConfig.js
const multer = require('multer');


// Multer configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "public/images");
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      
      cb(null, uniqueSuffix + ".jpeg" );
    },
  });



// Create a Multer instance
const upload = multer({ storage: storage });

// Multer middleware function
function multerMiddleware(req, res, next) {
  upload.single('file')(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      // Multer error occurred
      // Handle the error
      console.log('Multer Error:', err);
    } else if (err) {
      // Other error occurred
      // Handle the error
      console.log('Other Error:', err);
    }
    next();
  });
}

module.exports = {
  upload,
  multerMiddleware
};
