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
const adminController = require("./controller/adminController.js");

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

//Get Foods
app.get("/api/v1/foods", cors(), async function (request, response) {
  const resultGetData = await foodController.foodsGet();

  response.status(resultGetData.status);
  response.json(resultGetData);
});

//Get Food By Type
app.get("/api/v1/foods/:type", cors(), async function (request, response) {
  const foodType = request.params.type;

  const resultGetData = await foodController.foodsTypeGet(foodType);

  response.status(resultGetData.status);
  response.json(resultGetData);
});

//Get Food
app.get("/api/v1/foods-id/:id", cors(), async function (request, response) {
  const foodId = request.params.id;

  const resultGetData = await foodController.foodGet(foodId);

  response.status(resultGetData.status);
  response.json(resultGetData);
});

//Food Delete
app.delete(
  "/api/v1/food-delete/:id",
  cors(),
  async function (request, response) {
    const foodId = request.params.id;
    const resultDeleteData = await foodController.foodDelete(foodId);

    response.status(resultDeleteData.status);
    response.json(resultDeleteData);
  }
);

//Food Update
app.put(
  "/api/v1/food-update/:id",
  cors(),
  bodyJSON,
  async function (request, response) {
    const foodId = request.params.id;
    const bodyData = request.body;

    const resultUpdateData = await foodController.foodUpdate(foodId, bodyData);

    response.status(resultUpdateData.status);
    response.json(resultUpdateData);
  }
);

//Admin Login
app.post("/api/v1/login", cors(), bodyJSON, async function (request, response) {
  const bodyData = request.body;

  const resultLogin = await adminController.loginAdmin(bodyData);

  response.status(resultLogin.status.status);
  response.json(resultLogin);
});

//Admin Insert
app.post(
  "/api/v1/admin-registration",
  cors(),
  bodyJSON,
  async function (request, response) {
    const bodyData = request.body;

    const resultInsert = await adminController.adminInsert(bodyData);

    response.status(resultInsert.status);
    response.json(resultInsert);
  }
);

//Admin Get
app.post("/api/v1/admin", cors(), bodyJSON, async function (request, response) {
  const bodyData = request.body;

  const resultAdmin = await adminController.adminGet(bodyData);

  response.status(resultAdmin.status);
  response.json(resultAdmin);
});

app.listen(8080, function () {
  console.log("Server waiting for requests on port 8080!");
});
