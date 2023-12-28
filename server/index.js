const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors"); //safely recieve resources from another domain
const bodyParser = require('body-parser');  //to parse the body of HTTP request
const path = require("path");
const app = express();
const port = 3000;

dotenv.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Db Connected"))
  .catch((err) => console.log(err));

//routes import
const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
const listingRouter = require("./routes/listing");
const categoryRouter = require("./routes/category");
const vendorRouter = require("./routes/vendor");


// MiddleWare
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static("./public"));
app.use(cors());
app.disable("x-powered-by"); //less hackers know your stack

//routes
app.use("/api/v1/auth/", authRouter);
app.use("/api/v1/user/", userRouter);
app.use("/api/v1/listing/", listingRouter);
app.use("/api/v1/category/", categoryRouter);
app.use("/api/v1/vendor/", vendorRouter);


app.listen(process.env.PORT || port, () =>
  console.log(`Mart Server Listening at port ${process.env.PORT}`)
);
