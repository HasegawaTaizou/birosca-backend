const FOOD_TYPES = ["ACAI", "SNACK", "DRINK", "DIVERSE"];

let type = "Acai";

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

console.log(validateFoodType(type))
