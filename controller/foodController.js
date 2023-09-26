const foodDAO = require("../model/dao/foodDAO.js");

const message = require("./module/config.js");

//VALIDATIONS
const { validateFoodType } = require("../validations/validate-food-type.js");
const { validateImage } = require("../validations/validate-image.js");
const {
  validateIngredients,
} = require("../validations/validate-ingredients.js");
const { validatePrice } = require("../validations/validate-price.js");
const { validateTitle } = require("../validations/validate-title.js");

const foodInsert = async function (foodData) {
  if (
    validateTitle(foodData.title) ||
    validatePrice(foodData.price) ||
    validateImage(foodData.image) ||
    validateFoodType(foodData.foodType) ||
    validateIngredients(foodData.ingredients)
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
  const foodData = await foodDAO.getFoods();

  if (foodData.length == 0) {
    return message.NOT_FOUND;
  }

  let jsonFoodData = {};

  if (foodData) {
    let foodMap = {};

    foodData.forEach((food) => {
      if (!foodMap[food.id]) {
        foodMap[food.id] = {
          id: food.id,
          title: food.title,
          price: food.price,
          image: food.image,
          type: food.type,
          ingredients: [],
        };
      }

      foodMap[food.id].ingredients.push(food.ingredient);
    });

    let foodList = Object.values(foodMap);

    jsonFoodData.status = 200;
    jsonFoodData.foods = foodList;

    return jsonFoodData;
  } else {
    return message.ERROR_INTERNAL_SERVER;
  }
};

const foodsTypeGet = async function (foodType) {
  const foodData = await foodDAO.getFoodsByType(foodType);

  if (foodData.length == 0) {
    return message.NOT_FOUND;
  }

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
