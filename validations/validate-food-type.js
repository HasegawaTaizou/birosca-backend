const FOOD_TYPES = ["ACAI", "SNACK", "DRINK", "DIVERSE"];

const validateFoodType = function (foodType) {
  let status = true;

  if (
    foodType == null ||
    foodType == undefined ||
    !isNaN(foodType) ||
    foodType == "" ||
    !FOOD_TYPES.includes(foodType.toUpperCase())
  ) {
    status = false;
  }
  return status;
};

module.exports = {
  validateFoodType
}