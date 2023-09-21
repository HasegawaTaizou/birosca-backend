const foodDAO = require("../model/dao/foodDAO.js");

const message = require("./module/config.js");

const foodInsert = async function (foodData) {
  if (false) {
    return message.ERROR_REQUIRED_DATA;
  } else {
    let status = await foodDAO.insertFood(foodData);
    if (status) {
      return message.CREATED_ITEM;
    } else {
      return message.ERROR_INTERNAL_SERVER;
    }
  }
};

/*
const hospitalInsert = async function (hospitalData) {
  if (false) {
    return message.ERROR_REQUIRED_DATA;
  } else {
    let status = await hospitalDAO.insertHospital(hospitalData);
    if (status) {
      return message.CREATED_ITEM;
    } else {
      return message.ERROR_INTERNAL_SERVER;
    }
  }
};

const hospitalGet = async function (hospitalId) {
  if (false) {
    return message.ERROR_REQUIRED_DATA;
  } else {
    let hospitalData = await hospitalDAO.getHospitalById(hospitalId);

    let jsonHospitalData = {};

    if (hospitalData) {
      jsonHospitalData.status = 200;
      jsonHospitalData.hospital = {
        name: hospitalData[0].name,
        cnpj: hospitalData[0].cnpj,
        email: hospitalData[0].email,
        phone: hospitalData[0].phone,
        website: hospitalData[0].website_url,
        donationSite: hospitalData[0].donationSite,
        otherDonationSite: hospitalData[0].otherDonationSite,
        photo: hospitalData[0].url,
      };
      jsonHospitalData.address = {
        cep: hospitalData[0].cep,
        uf: hospitalData[0].uf,
        city: hospitalData[0].city,
        neighborhood: hospitalData[0].neighborhood,
        street: hospitalData[0].street,
        complement: hospitalData[0].complement,
      };

      console.log(`Hospital Data: ${hospitalData}`);

      return jsonHospitalData;
    } else {
      return message.ERROR_INTERNAL_SERVER;
    }
  }
};

const hospitalUpdate = async function (hospitalId, hospitalData) {
  if (false) {
    return message.ERROR_REQUIRED_DATA;
  } else {
    let status = await hospitalDAO.updateHospital(hospitalId, hospitalData);
    if (status) {
      return message.CREATED_ITEM;
    } else {
      return message.ERROR_INTERNAL_SERVER;
    }
  }
};
*/

module.exports = {
  foodInsert,
};
