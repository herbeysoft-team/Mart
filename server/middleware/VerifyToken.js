const jwt = require("jsonwebtoken");
const { TOKEN_KEY, TOKEN_EXPIRY } = process.env;

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Check if the authorization header is missing
  if (!authHeader) {
    return res.status(401).send("You are not authenticated");
  }

  const token = authHeader.split(" ")[1];

  //VERIFY THE TOKEN
  jwt.verify(token, TOKEN_KEY, (err, user) => {
    if (err) return res.status(403).send("Token is invalid");
    req.user = user;
    next();
  });
  
};

module.exports = verifyToken;
