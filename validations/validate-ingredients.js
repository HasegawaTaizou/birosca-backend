
let array = ["aaa", "bbb"]

const validateIngredients = function (ingredients) {
  let status = true;

  if (
    ingredients == null ||
    ingredients == undefined ||
    !isNaN(ingredients) ||
    ingredients == "" ||
    ingredients.length == 0 ||
    ingredients == []
  ) {
    status = false;
  }
  return status;
};

console.log(validateIngredients(array))
