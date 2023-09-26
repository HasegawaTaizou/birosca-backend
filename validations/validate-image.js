const validateImage = function (image) {
  let status = true;

  if (
    image == null ||
    image == undefined ||
    !isNaN(image) ||
    image == ""
  ) {
    status = false;
  }
  return status;
};

module.exports = {
  validateImage
}