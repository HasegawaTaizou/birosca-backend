
let preco = "dawd"

const validatePrice = function (price) {
  let status = true;

  if (
    price == null ||
    price == undefined ||
    isNaN(price) ||
    price == "" ||
    price < 0
  ) {
    status = false;
  }
  return status;
};

console.log(validatePrice(preco))
