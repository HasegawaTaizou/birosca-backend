const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const adminLogin = async function (loginData) {
  try {
    const admin = await getAdminByEmail(loginData.email);

    if (admin) {
      const emailMatch = loginData.email === admin.email ? true : false;
      const passwordMatch =
        loginData.password === admin.password ? true : false;

      const loginMatch = emailMatch && passwordMatch;
      if (loginMatch) {
        return admin;
      }
    }
  } catch (error) {
    return false;
  }
};

const insertAdmin = async function (adminData) {
  try {
    const insertAdminData = await prisma.admin.create({
      data: {
        email: adminData.email,
        password: adminData.password,
      },
    });

    return true;
  } catch (error) {
    return false;
  } finally {
    await prisma.$disconnect();
  }
};

const getAdminByEmail = async function (adminEmail) {
  try {
    const admin = await prisma.admin.findFirst({
      where: {
        email: adminEmail.email,
      },
    });
    return admin;
  } catch (error) {
    return false;
  }
};

const updateAdmin = async function (adminData) {
  try {
    const admin = await getAdminByEmail(adminData.email);

    if (admin.email == adminData.email) {
      const updateAdminData = await prisma.admin.updateMany({
        where: {
          email: adminData.email,
        },
        data: {
          email: adminData.email,
          password: adminData.password,
        },
      });
      return true;
    }
    return false;
  } catch (error) {
    return false
  } finally {
    await prisma.$disconnect();
  }
};

module.exports = {
  adminLogin,
  insertAdmin,
  getAdminByEmail,
  updateAdmin,
};
