
// Express is a module. Provides you a way to implement HTTP server.
const express = require("express");
// create a express application object .
const app = express();
// import DB connection. so that DB intilizes at application start up
const mongoose = require('mongoose');

// parses request body with desired format. currently we are using JSON.
const bodyParser = require("body-parser");
// import controllers
// import routes
const router = require('./server_modules/router');

const PORT = 3000;
// config to read config from file and env.
const config = require("config");

const path = require("path");

class Server {

  constructor() {
    this.dbConnect();
    this.initializeRoutes();
    this.listen();

  }

  dbConnect() {

    mongoose.connect(
      "mongodb+srv://Shambhukeshri:shambhu68@cluster0-co3rz.mongodb.net/parcel-guru?retryWrites=true&w=majority",
      { useNewUrlParser: true }).then((data)=>{

        console.log("Connected to database.....");
      }).catch((err)=>{

        console.log("Mongo connection failed....");
      });


  }

  initializeRoutes() {



    // use body parser... currently parsing only JSON requests.
    app.use(bodyParser.json());

    // TODO : move this out to health.controller.js
    app.get("/health", function (req, res) {
      res.send({ "status": "UP!!" });
      // check DB status as well!!

    });
    // health controller ends here...

    // register your router here.
    app.use("/api/v1/", router);

    app.use(express.static(path.join(__dirname, '/dist/')));
    app.use("*", function (req, res) {
      // res.sendFile(__dirname + "/index.html");
      // res.sendFile(path.join( "/Users/chaitanya/CB/node_training/node_js/flipkart/index.html"));
      res.sendFile(path.join(__dirname, '/dist/index.html'));
    });

    if (process.env.NODE_ENV !== 'prd') {


    }


    console.log("__dirname and index using path....:: ", path.join(__dirname, ''));
  }

  listen() {

    console.log(`spinning up server.... on port ${PORT}`);
    app.listen(PORT, function () {

      console.log("Server started on port : ", PORT)
    })
  }


}

new Server();
