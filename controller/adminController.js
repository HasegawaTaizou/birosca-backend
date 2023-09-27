const adminDAO = require("../model/dao/adminDAO.js");
const { JWT_SECRET } = require("../config.js");
const jwt = require("jsonwebtoken");

const message = require("./module/config.js");

//VALIDATIONS
const { validateEmail } = require("../validations/validate-email.js");
const { validatePassword } = require("../validations/validate-password.js");

const loginAdmin = async function (loginData) {
  if (
    !validateEmail(loginData.email) ||
    !validatePassword(loginData.password)
  ) {
    return message.ERROR_REQUIRED_DATA;
  } else {
    const adminData = await adminDAO.adminLogin(loginData);

    if (adminData == null || adminData == undefined) {
      return message.LOGIN_INCORRECT;
    } else if (adminData) {
      const jsonAdminData = {};

      const token = jwt.sign(
        { userId: adminData.id, email: adminData.email },
        JWT_SECRET
      );

      jsonAdminData.status = message.LOGIN_CORRECT.status;
      jsonAdminData.userData = {
        userId: adminData.id,
        email: adminData.email,
        token: token,
      };

      return jsonAdminData;
    } else {
      return message.LOGIN_INCORRECT;
    }
  }
};

const adminInsert = async function (adminInsert) {
  if (
    !validateEmail(adminInsert.email) ||
    !validatePassword(adminInsert.password)
  ) {
    return message.ERROR_REQUIRED_DATA;
  } else {
    const status = await adminDAO.insertAdmin(adminInsert);
    if (status) {
      return message.CREATED_ITEM;
    } else {
      return message.ERROR_INTERNAL_SERVER;
    }
  }
};

const adminGet = async function (adminEmail) {
  if (!validateEmail(adminEmail.email)) {
    return message.ERROR_INVALID_EMAIL;
  } else {
    const adminData = await adminDAO.getAdminByEmail(adminEmail);

    if (adminData == null || adminData == undefined) {
      return message.ERROR_RESOURCE_NOT_FOUND;
    } else if (adminData) {
      const jsonAdminData = {};

      jsonAdminData.status = message.LOGIN_CORRECT.status;
      jsonAdminData.userData = {
        id: adminData.id,
        email: adminData.email,
        password: adminData.password,
      };

      return jsonAdminData;
    } else {
      return message.ERROR_INTERNAL_SERVER;
    }
  }
};

const adminUpdate = async function (adminUpdate) {
  if (
    !validateEmail(adminUpdate.email) ||
    !validatePassword(adminUpdate.password)
  ) {
    return message.ERROR_REQUIRED_DATA;
  } else {
    const adminData = await adminDAO.getAdminByEmail(adminUpdate.email);
    if (
      adminData == null ||
      adminData == undefined ||
      adminData.email != adminUpdate.email
    ) {
      return message.ERROR_RESOURCE_NOT_FOUND;
    } else if (adminData.email == adminUpdate.email) {
      const status = await adminDAO.updateAdmin(adminUpdate);
      if (status) {
        return message.UPDATED_ITEM;
      }
    } else {
      return message.ERROR_INTERNAL_SERVER;
    }
  }
};

module.exports = {
  loginAdmin,
  adminInsert,
  adminGet,
  adminUpdate,
};
