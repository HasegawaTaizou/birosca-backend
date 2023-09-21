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

const getFoods = async function () {
  const sql = `
  SELECT tbl_food.id, tbl_food.title, tbl_food.price, tbl_food.image, tbl_food_type.type, tbl_food_ingredient.ingredient FROM tbl_food_ingredient
  INNER JOIN tbl_food ON tbl_food.id = tbl_food_ingredient.id_food
  INNER JOIN tbl_food_type ON tbl_food_type.id = tbl_food.id_food_type;
  `;

  const responseFood = await prisma.$queryRawUnsafe(sql);

  if (responseFood) {
    return responseFood;
  } else {
    return false;
  }
};

const getFoodsByType = async function (foodType) {
  const sql = `
  SELECT tbl_food.id, tbl_food.title, tbl_food.price, tbl_food.image, tbl_food_type.type, tbl_food_ingredient.ingredient FROM tbl_food_ingredient
  INNER JOIN tbl_food ON tbl_food.id = tbl_food_ingredient.id_food
  INNER JOIN tbl_food_type ON tbl_food_type.id = tbl_food.id_food_type
  WHERE tbl_food_type.type = "${foodType}";
  `;

  const responseFood = await prisma.$queryRawUnsafe(sql);

  if (responseFood) {
    return responseFood;
  } else {
    return false;
  }
};

const getFoodById = async function (foodId) {
  const sql = `
  SELECT tbl_food.id, tbl_food.title, tbl_food.price, tbl_food.image, tbl_food_type.type, tbl_food_ingredient.ingredient FROM tbl_food_ingredient
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

// const updateFood = async function (foodId, foodData) {
//   try {
//     const oldFoodData = await prisma.food.findUnique({
//       where: {
//         id: Number(foodId),
//       },
//       include: {
//         FoodIngredient: {
//           select: {
//             idFood: true,
//             ingredient: true,
//           },
//         },
//       },
//     });

//     console.log("ANTIGOOOOOOOOOOOOOO");
//     console.log(oldFoodData);

//     const updatedFood = await prisma.food.update({
//       where: {
//         id: Number(foodId),
//       },
//       data: {
//         // UPDATE FOOD
//         title: foodData.title,
//         price: foodData.price,
//         image: foodData.image,
//         // UPDATE FOOD INGREDIENTS
//         FoodIngredient: {
//           update: {
//             where: {
//               id: Number(foodId),
//             },
//             data: {
//               ingredient: foodData.ingredients[0],
//             },
//           },
//         },
//       },
//     });

//     console.log("NOVOOOOOOOOOOOOOOO");
//     console.log(updatedFood);

//     return true;
//   } catch (error) {
//     console.error("Erro ao atualizar o food:", error);
//   } finally {
//     await prisma.$disconnect();
//   }
// };

const updateFood = async function (foodId, foodData) {
  try {
    // Crie um array de promessas para as operações de criação de ingredientes
    const createIngredientPromises = foodData.ingredients.map(
      async (ingredientName) => {
        return prisma.foodIngredient.create({
          data: {
            ingredient: ingredientName,
            idFood: Number(foodId),
            // Food: {
            //   connect: {
            //     id: Number(foodId)
            //   }
            // }
          },
        });
      }
    );

    // Aguarde a resolução de todas as promessas de criação de ingredientes
    await Promise.all(createIngredientPromises);

    // Exclua todos os ingredientes associados a este alimento
    await prisma.foodIngredient.deleteMany({
      where: {
        idFood: Number(foodId),
      },
    });

    // Atualize os dados do alimento
    await prisma.food.update({
      where: {
        id: Number(foodId),
      },
      data: {
        title: foodData.title,
        price: foodData.price,
        image: foodData.image,
      },
    });

    console.log("Atualização concluída com sucesso.");
    return true;
  } catch (error) {
    console.error("Erro ao atualizar o alimento:", error);
  } finally {
    await prisma.$disconnect();
  }
};

/*


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
  getFoods,
  getFoodsByType,
  getFoodById,
  updateFood,
};
