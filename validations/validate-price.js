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

module.exports = {
  validatePrice
}