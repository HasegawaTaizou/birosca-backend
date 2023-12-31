const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const foodTypeDAO = require("./foodTypeDAO.js");
const foodIngredientDAO = require("./foodIngredientDAO.js");

const insertFood = async function (foodData) {
  try {
    const foodTypeName = await foodTypeDAO.getFoodTypeIdByName(
      foodData.foodType
    );
    const idFoodType = foodTypeName[0].id;

    //Food Insert
    const insertFoodData = await prisma.food.create({
      data: {
        image: foodData.image,
        title: foodData.title,
        price: foodData.price,
        idFoodType: idFoodType,
      },
    });
    const foodId = insertFoodData.id;

    //Food Ingredient Insert
    const foodIngredientInsert = await foodIngredientDAO.insertFoodIngredient(
      foodId,
      foodData.ingredients
    );

    return true;
  } catch (error) {
    return false;
  } finally {
    await prisma.$disconnect();
  }
};

const getFoods = async function () {
  const sql = `
  SELECT tbl_food.id, tbl_food.title, tbl_food.price, tbl_food.image, tbl_food_type.type, tbl_food_ingredient.ingredient FROM tbl_food_ingredient
  INNER JOIN tbl_food ON tbl_food.id = tbl_food_ingredient.id_food
  INNER JOIN tbl_food_type ON tbl_food_type.id = tbl_food.id_food_type;
  `;

  const responseFood = await prisma.$queryRawUnsafe(sql);

  if (responseFood) {
    return responseFood;
  } else {
    return false;
  }
};

const getFoodsByType = async function (foodType) {
  const sql = `
  SELECT tbl_food.id, tbl_food.title, tbl_food.price, tbl_food.image, tbl_food_type.type, tbl_food_ingredient.ingredient FROM tbl_food_ingredient
  INNER JOIN tbl_food ON tbl_food.id = tbl_food_ingredient.id_food
  INNER JOIN tbl_food_type ON tbl_food_type.id = tbl_food.id_food_type
  WHERE tbl_food_type.type = "${foodType}";
  `;

  const responseFood = await prisma.$queryRawUnsafe(sql);

  if (responseFood) {
    return responseFood;
  } else {
    return false;
  }
};

const getFoodById = async function (foodId) {
  const sql = `
  SELECT tbl_food.id, tbl_food.title, tbl_food.price, tbl_food.image, tbl_food_type.type, tbl_food_ingredient.ingredient FROM tbl_food_ingredient
  INNER JOIN tbl_food ON tbl_food.id = tbl_food_ingredient.id_food
  INNER JOIN tbl_food_type ON tbl_food_type.id = tbl_food.id_food_type
  WHERE tbl_food.id = ${foodId};
  `;

  const responseFood = await prisma.$queryRawUnsafe(sql);

  if (responseFood) {
    return responseFood;
  } else {
    return false;
  }
};

const deleteFoodById = async function (foodId) {
  try {
    await prisma.$transaction(async (tx) => {
      await tx.foodIngredient.deleteMany({
        where: {
          idFood: Number(foodId),
        },
      });

      await tx.food.delete({
        where: {
          id: Number(foodId),
        },
      });
    });

    return true;
  } catch (error) {
    return false;
  }
};

const updateFood = async function (foodId, foodData) {
  //Get Food Ingredients
  const responseFoodIngredients = await foodIngredientDAO.getFoodIngredient(
    foodId
  );

  //Update Food
  const sqlUpdateFood = `
    UPDATE tbl_food
  SET
      image = '${foodData.image}',
      title = '${foodData.title}',
      price = ${foodData.price}
  WHERE
      id = ${foodId};
  `;

  const responseFoodUpdate = await prisma.$executeRawUnsafe(sqlUpdateFood);

  const indexIngredients = Math.min(
    responseFoodIngredients.length,
    foodData.ingredients.length
  );

  // Delete Ingredients
  if (responseFoodIngredients.length > foodData.ingredients.length) {
    const newIngredients = foodData.ingredients.slice(0, indexIngredients);
    const ingredientsToRemove = responseFoodIngredients.slice(
      newIngredients.length
    );

    //Delete
    ingredientsToRemove.forEach(async function (ingredient) {
      await foodIngredientDAO.deleteFoodIngredient(foodId, ingredient.id);
    });

    //Update
    responseFoodIngredients.forEach(async function (ingredient, index) {
      await foodIngredientDAO.updateFoodIngredient(
        foodId,
        ingredient.id,
        newIngredients[index]
      );
    });
  }

  //Update Ingredients
  responseFoodIngredients.forEach(async function (ingredient, index) {
    await foodIngredientDAO.updateFoodIngredient(
      foodId,
      ingredient.id,
      foodData.ingredients[index]
    );
  });

  const newIngredients = foodData.ingredients.slice(
    responseFoodIngredients.length
  );

  //Insert Ingredients
  await foodIngredientDAO.insertFoodIngredient(foodId, newIngredients);

  if (responseFoodUpdate) {
    return responseFoodUpdate;
  } else {
    return false;
  }
};

module.exports = {
  insertFood,
  getFoods,
  getFoodsByType,
  getFoodById,
  deleteFoodById,
  updateFood,
};
