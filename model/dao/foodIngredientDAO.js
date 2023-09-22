const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getFoodIngredient = async function (foodId) {
  const sql = `
    SELECT tbl_food_ingredient.id, tbl_food_ingredient.ingredient FROM tbl_food_ingredient
    INNER JOIN tbl_food ON tbl_food.id = tbl_food_ingredient.id_food
    WHERE tbl_food_ingredient.id_food = ${foodId};
    `;

  const responseFoodIngredient = await prisma.$queryRawUnsafe(sql);

  return responseFoodIngredient;
};

const insertFoodIngredient = async function (foodId, foodIngredientData) {
  try {
    foodIngredientData.forEach(async function (ingredient) {
      const insertFoodData = await prisma.foodIngredient.create({
        data: {
          ingredient: ingredient,
          idFood: Number(foodId),
        },
      });
    });

    return true;
  } catch (error) {
    console.error("Erro ao criar o food Ingredient:", error);
  } finally {
    await prisma.$disconnect();
  }
};

const updateFoodIngredient = async function (
  foodId,
  ingredientId,
  ingredientName
) {
  const sql = `
    UPDATE tbl_food_ingredient
    SET
        ingredient = '${ingredientName}'
    WHERE
        id = ${ingredientId} AND id_food = ${foodId};
    `;

  const responseFoodIngredientUpdate = await prisma.$executeRawUnsafe(sql);
};

const deleteFoodIngredient = async function (foodId, ingredientId) {
  const sql = `
  DELETE FROM tbl_food_ingredient
  WHERE id_food = ${foodId} AND id = ${ingredientId};
  `;

  const responseFoodIngredientDelete = await prisma.$executeRawUnsafe(sql);
};

module.exports = {
  getFoodIngredient,
  insertFoodIngredient,
  updateFoodIngredient,
  deleteFoodIngredient,
};
