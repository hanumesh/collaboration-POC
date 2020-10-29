
const express = require("express");
const PORT = process.env.PORT || 4000;
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const server = express();
//bring in db config
require("./config/db")(server);
//db config ends here

// const userRoutes = require("./routes/userRoute"); //bring in our user routes
// server.use("/", userRoutes);

// server.use(cors()); // configure cors
// //configure body parser
// server.use(bodyParser.urlencoded({
//     extended: false
// }));
// server.use(bodyParser.json());
// //configure body-parser ends here
// server.use(morgan("dev")); // configire morgan
// // define first route
// server.get("/", (req, res) => {
//     console.log("Hello MEAN Soldier...Ready For Battle??");
// });

server.listen(PORT, () => {
    console.log(`App is running on ${PORT}`);
});