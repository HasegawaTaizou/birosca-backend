//*****************************************ERROR CONSTANTS*********************************************************/
const ERROR_REQUIRED_DATA = {
  status: 400,
  message: "Existem dados obrigatórios que não foram preenchidos.",
};
const ERROR_INVALID_ID = {
  status: 400,
  message:
    "O ID especificado é inválido. Certifique-se de que seja um valor numérico.",
};
const NOT_FOUND = {
  status: 404,
  message: "Nenhum item encontrado.",
};
const ERROR_INTERNAL_SERVER = {
  status: 500,
  message: "Erro interno no servidor de banco de dados",
};

//*****************************************SUCCESSFUL CONSTANTS******************************************************/
const CREATED_ITEM = { status: 201, message: "Registro criado com sucesso." };

//*****************************************LOGIN CONSTANTS******************************************************/
const LOGIN_INCORRECT = {
  status: 404,
  message: "User or password incorrects.",
};
const LOGIN_CORRECT = { status: 200, message: "Login Succesfull." };

module.exports = {
  ERROR_REQUIRED_DATA,
  ERROR_INVALID_ID,
  NOT_FOUND,
  ERROR_INTERNAL_SERVER,
  CREATED_ITEM,
  LOGIN_INCORRECT,
  LOGIN_CORRECT,
};
