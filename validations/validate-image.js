
let imagem = "ewfw45345dw"

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

console.log(validateImage(imagem))
