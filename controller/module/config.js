//*****************************************ERROR CONSTANTS*********************************************************/
const ERROR_REQUIRED_DATA = { status: 400, message: 'Existem dados obrigatórios que não foram preenchidos.' };
const ERROR_INTERNAL_SERVER = { status: 500, message: 'Erro interno no servidor de banco de dados' };

//*****************************************SUCCESSFUL CONSTANTS******************************************************/
const CREATED_ITEM = { status: 201, message: 'Registro criado com sucesso.' };

module.exports = {
    ERROR_REQUIRED_DATA,
    ERROR_INTERNAL_SERVER,
    CREATED_ITEM
}