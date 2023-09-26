const foodDAO = require("../model/dao/foodDAO.js");

const message = require("./module/config.js");

const foodInsert = async function (foodData) {
  if (
    foodData.title == null || foodData.title == undefined || !isNaN(foodData.title) || foodData.title == "" || foodData.title.length > 100
    //validar o array de ingredients
  ) {
    return message.ERROR_REQUIRED_DATA;
  } else {
    let status = await foodDAO.insertFood(foodData);
    if (status) {
      return message.CREATED_ITEM;
    } else {
      return message.ERROR_INTERNAL_SERVER;
    }
  }
};

const foodsGet = async function () {
  if (false) {
    return message.ERROR_REQUIRED_DATA;
  } else {
    const foodData = await foodDAO.getFoods();

    let jsonFoodData = {};

    if (foodData && foodData.length > 0) {
      let foodMap = {};

      foodData.forEach((item) => {
        if (!foodMap[item.id]) {
          foodMap[item.id] = {
            id: item.id,
            title: item.title,
            price: item.price,
            image: item.image,
            type: item.type,
            ingredients: [],
          };
        }

        foodMap[item.id].ingredients.push(item.ingredient);
      });

      let foodList = Object.values(foodMap);

      jsonFoodData.status = 200;
      jsonFoodData.foods = foodList;

      return jsonFoodData;
    } else {
      return message.ERROR_INTERNAL_SERVER;
    }
  }
};

const foodsTypeGet = async function (foodType) {
  if (false) {
    return message.ERROR_REQUIRED_DATA;
  } else {
    const foodData = await foodDAO.getFoodsByType(foodType);

    let jsonFoodData = {};

    if (foodData && foodData.length > 0) {
      let foodMap = {};

      foodData.forEach((item) => {
        if (!foodMap[item.id]) {
          foodMap[item.id] = {
            id: item.id,
            title: item.title,
            price: item.price,
            image: item.image,
            type: item.type,
            ingredients: [],
          };
        }

        foodMap[item.id].ingredients.push(item.ingredient);
      });

      let foodList = Object.values(foodMap);

      jsonFoodData.status = 200;
      jsonFoodData.foods = foodList;

      return jsonFoodData;
    } else {
      return message.ERROR_INTERNAL_SERVER;
    }
  }
};

const foodGet = async function (foodId) {
  if (false) {
    return message.ERROR_REQUIRED_DATA;
  } else {
    const foodData = await foodDAO.getFoodById(foodId);

    const jsonFoodData = {};

    if (foodData) {
      const ingredients = foodData.map((food) => food.ingredient);

      jsonFoodData.status = 200;
      jsonFoodData.food = [
        {
          id: foodData[0].id,
          title: foodData[0].title,
          price: foodData[0].price,
          image: foodData[0].image,
          type: foodData[0].type,
          ingredients: ingredients,
        },
      ];

      return jsonFoodData;
    } else {
      return message.ERROR_INTERNAL_SERVER;
    }
  }
};

const foodDelete = async function (foodId) {
  if (false) {
    return message.ERROR_REQUIRED_DATA;
  } else {
    let status = await foodDAO.deleteFoodById(foodId);
    if (status) {
      return message.CREATED_ITEM;
    } else {
      return message.ERROR_INTERNAL_SERVER;
    }
  }
};

const foodUpdate = async function (foodId, foodData) {
  if (false) {
    return message.ERROR_REQUIRED_DATA;
  } else {
    let status = await foodDAO.updateFood(foodId, foodData);
    if (status) {
      return message.CREATED_ITEM;
    } else {
      return message.ERROR_INTERNAL_SERVER;
    }
  }
};

module.exports = {
  foodInsert,
  foodsGet,
  foodsTypeGet,
  foodGet,
  foodDelete,
  foodUpdate,
};
