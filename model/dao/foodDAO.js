const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const foodTypeDAO = require("./foodTypeDAO.js");
const foodIngredientDAO = require("./foodIngredientDAO.js");

const insertFood = async function (foodData) {
  try {
    const foodTypeName = await foodTypeDAO.getFoodTypeIdByName(
      foodData.foodType
    );
    const idFoodType = foodTypeName[0].id;

    //Food Insert
    const insertFoodData = await prisma.food.create({
      data: {
        image: foodData.image,
        title: foodData.title,
        price: foodData.price,
        idFoodType: idFoodType,
      },
    });
    const foodId = insertFoodData.id;

    //Food Ingredient Insert
    const foodIngredientInsert = await foodIngredientDAO.insertFoodIngredient(
      foodId,
      foodData.ingredients
    );

    return true;
  } catch (error) {
    console.error("Erro ao criar a comida:", error);
  } finally {
    await prisma.$disconnect();
  }
};

const getFoodById = async function (foodId) {
  const sql = `
  SELECT tbl_food.title, tbl_food.price, tbl_food.image, tbl_food_type.type, tbl_food_ingredient.ingredient FROM tbl_food_ingredient
  INNER JOIN tbl_food ON tbl_food.id = tbl_food_ingredient.id_food
  INNER JOIN tbl_food_type ON tbl_food_type.id = tbl_food.id_food_type
  WHERE tbl_food.id = ${foodId};
  `;

  const responseFood = await prisma.$queryRawUnsafe(sql);

  if (responseFood) {
    return responseFood;
  } else {
    return false;
  }
};

/*
async function insertHospital(hospitalData) {
  try {
    //Address Insert
    let addressInsert = await addressDAO.insertAddress(hospitalData.address);
    let addressId = addressInsert.id;

    //Hospital Insert
    const insertHospitalData = await prisma.hospital.create({
      data: {
        name: hospitalData.hospital.name,
        cnpj: hospitalData.hospital.cnpj,
        email: hospitalData.hospital.email,
        websiteUrl: hospitalData.hospital.website,
        password: hospitalData.hospital.password,
        idAddress: addressId,
      },
    });
    let hospitalId = insertHospitalData.id;

    //Phone Insert
    let phoneInsert = await phoneDAO.insertPhone(
      hospitalData.hospital,
      hospitalId
    );

    //Site Insert
    let insertSite = await siteDAO.insertSite(hospitalData.hospital);

    let donationSiteId = insertSite[0].id;
    let otherDonationSiteId = insertSite[1].id;

    //Hospital Site Insert
    let insertHospitalSite = await hospitalSiteDAO.insertHospitalSite(
      hospitalId,
      donationSiteId,
      otherDonationSiteId
    );

    //Photo Insert
    let insertPhoto = await photoDAO.insertPhoto(
      hospitalData.hospital,
      hospitalId
    );

    return true;
  } catch (error) {
    console.error("Erro ao criar o hospital:", error);
  } finally {
    await prisma.$disconnect();
  }
}

const getHospitalById = async function (hospitalId) {
  console.log(hospitalId);
  let sql = `
  SELECT tbl_hospital.id,
  tbl_hospital.name,
  tbl_hospital.cnpj,
  tbl_hospital.email,
  tbl_phone.phone,
  tbl_hospital.website_url,
  tbl_photo.url,
  tbl_address.cep,
  tbl_address.uf,
  tbl_address.city,
  tbl_address.neighborhood,
  tbl_address.street,
  tbl_address.number,
  tbl_address.complement,
  (
      SELECT site
      FROM tbl_hospital_site
          INNER JOIN tbl_site ON tbl_hospital_site.id_site = tbl_site.id
      WHERE tbl_hospital_site.id_hospital = tbl_hospital.id
      ORDER BY tbl_site.id
      LIMIT 1
  ) AS donationSite,
  (
      SELECT site
      FROM tbl_hospital_site
          INNER JOIN tbl_site ON tbl_hospital_site.id_site = tbl_site.id
      WHERE tbl_hospital_site.id_hospital = tbl_hospital.id
      ORDER BY tbl_site.id
      LIMIT 1 OFFSET 1
  ) AS otherDonationSite
FROM tbl_hospital
  INNER JOIN tbl_phone ON tbl_phone.id_hospital = tbl_hospital.id
  INNER JOIN tbl_photo ON tbl_photo.id_hospital = tbl_hospital.id
  INNER JOIN tbl_address ON tbl_hospital.id_address = tbl_address.id
WHERE tbl_hospital.id = ${hospitalId};
  `;

  console.log(sql);

  let responseHospital = await prisma.$queryRawUnsafe(sql);

  console.log("response hospital: ", responseHospital);

  if (responseHospital) {
    return responseHospital;
  } else {
    return false;
  }
};

async function updateHospital(hospitalId, hospitalData) {
  try {
    const oldHospitalData = await prisma.hospital.findUnique({
      where: {
        id: Number(hospitalId),
      },
      include: {
        Phone: {
          select: {
            phone: true,
          },
        },
        Photo: {
          select: {
            url: true,
          },
        },
        HospitalSite: {
          select: {
            Site: {
              select: {
                site: true,
              },
            },
          },
        },
      },
    });

    console.log(hospitalData.hospital);

    const updatedHospital = await prisma.hospital.update({
      where: {
        id: Number(hospitalId),
      },
      data: {
        // UPDATE HOSPITAL
        name: hospitalData.hospital.name,
        cnpj: hospitalData.hospital.cnpj,
        email: hospitalData.hospital.email,
        websiteUrl: hospitalData.hospital.website,
        // UPDATE PHONE
        Phone: {
          update: {
            where: {
              id: Number(hospitalId),
            },
            data: {
              phone: hospitalData.hospital.phone,
            },
          },
        },
        // UPDATE PHOTO
        Photo: {
          update: {
            where: {
              id: Number(hospitalId),
            },
            data: {
              url: hospitalData.hospital.photo,
            },
          },
        },
        // UPDATE SITE
        HospitalSite: {
          update: {
            where: {
              id: Number(hospitalId),
            },
            data: {
              Site: {
                update: {
                  site: hospitalData.hospital.donationSite,
                  // site: hospitalData.hospital.otherDonationSite,
                },
              },
            },
          },
        },
        // UPDATE ADDRESS
        Address: {
          update: {
            cep: hospitalData.address.cep,
            uf: hospitalData.address.uf,
            city: hospitalData.address.city,
            neighborhood: hospitalData.address.neighborhood,
            street: hospitalData.address.street,
            number: hospitalData.address.number,
            complement: hospitalData.address.complement,
          },
        },
      },
    });

    return true;
  } catch (error) {
    console.error("Erro ao atualizar o hospital:", error);
  } finally {
    await prisma.$disconnect();
  }
}
*/

module.exports = {
  insertFood,
  getFoodById,
};
