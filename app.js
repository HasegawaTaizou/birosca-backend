const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

app.use((request, response, next) => {
  response.header("Access-Control-Allow-Origin", "*");
  response.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  app.use(cors());
  next();
});

const bodyJSON = bodyParser.json();

const foodController = require("./controller/foodController.js");

//ENDPOINTS:

//Food Registration
app.post(
  "/api/v1/food-registration",
  cors(),
  bodyJSON,
  async function (request, response) {
    const bodyData = request.body;

    const resultInsertData = await foodController.foodInsert(bodyData);

    response.status(resultInsertData.status);
    response.json(resultInsertData);
  }
);

//Get Food
app.get(
  "/api/v1/foods/:id",
  cors(),
  async function (request, response) {
    const foodId = request.params.id;

    const resultGetData = await foodController.foodGet(foodId);

    response.status(resultGetData.status);
    response.json(resultGetData);
  }
);

/*
//Hospital Registration
app.post(
  "/api/v1/hospital-registration",
  cors(),
  bodyJSON,
  async function (request, response) {
    let bodyData = request.body;

    let resultInsertData = await hospitalController.hospitalInsert(bodyData);

    response.status(resultInsertData.status);
    response.json(resultInsertData);
  }
);

//Get Hospital
app.get(
  "/api/v1/hospital-data/:id",
  cors(),
  async function (request, response) {
    let hospitalId = request.params.id;

    let resultGetData = await hospitalController.hospitalGet(hospitalId);

    response.status(resultGetData.status);
    response.json(resultGetData);
  }
);

//Hospital Password Update
app.put(
  "/api/v1/hospital/redefine-password/:id",
  cors(),
  bodyJSON,
  async function (request, response) {
    let hospitalId = request.params.id;
    let bodyData = request.body;

    let resultUpdateData = await hospitalController.hospitalPasswordUpdate(
      hospitalId,
      bodyData
    );

    response.status(resultUpdateData.status);
    response.json(resultUpdateData);
  }
);
*/

app.listen(8080, function () {
  console.log("Server waiting for requests on port 8080!");
});
