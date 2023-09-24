const adminDAO = require("../model/dao/adminDAO.js");
const { JWT_SECRET } = require("../config.js");
const jwt = require("jsonwebtoken");

const message = require("./module/config.js");

const loginAdmin = async function (loginData) {
  const jsonAdminData = {};

  const adminData = await adminDAO.adminLogin(loginData);

  if (adminData) {
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
};

const adminInsert = async function (adminInsert) {
  if (false) {
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
  const jsonAdminData = {};

  const adminData = await adminDAO.getAdminByEmail(adminEmail);

  if (adminData) {
    jsonAdminData.status = message.LOGIN_CORRECT.status;
    jsonAdminData.userData = {
      id: adminData.id,
      email: adminData.email,
      password: adminData.password,
    };

    console.log(jsonAdminData);

    return jsonAdminData;
  } else {
    return message.ERROR_INTERNAL_SERVER;
  }
};

module.exports = {
  loginAdmin,
  adminInsert,
  adminGet,
};
