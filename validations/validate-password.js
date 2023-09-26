const validatePassword = function (password) {
  let status = true;

  if (
    password == null ||
    password == undefined ||
    password == "" ||
    password.length > 250
  ) {
    status = false;
  }
  return status;
};

module.exports = {
  validatePassword,
};
