let title = "ewfw45345dw"

const validateTitle = function (title) {
  let status = true;

  if (
    title == null ||
    title == undefined ||
    !isNaN(title) ||
    title == "" ||
    title.length > 100
  ) {
    status = false;
  }
  return status;
};

console.log(validateTitle(title))
