const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

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

module.exports = {
  insertFoodIngredient,
  updateFoodIngredient,
};
