const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getFoodTypeIdByName = async function (foodTypeData) {
  const sql = `
  SELECT id FROM tbl_food_type
  WHERE type = "${foodTypeData}";
    `;

  const responseFoodType = await prisma.$queryRawUnsafe(sql);

  if (responseFoodType) {
    return responseFoodType;
  } else {
    return false;
  }
};

module.exports = {
  getFoodTypeIdByName,
};
