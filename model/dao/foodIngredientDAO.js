const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const insertFoodIngredient = async function (foodId, foodIngredientData) {
  try {
    foodIngredientData.forEach(async function (ingredient) {
      const insertFoodData = await prisma.foodIngredient.create({
        data: {
          ingredient: ingredient,
          idFood: foodId,
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

module.exports = {
  insertFoodIngredient,
};
