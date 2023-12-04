const axios = require('axios');
const pgp = require('pg-promise')();

// Configuração da conexão com o PostgreSQL
const db = pgp('postgres://postgres:1234@127.0.0.1:5432/users_github');


async function fetchDataFromGitHub(usernames) {
  try {
    for (const username of usernames) {
      // Faz a requisição à API do GitHub
      const response = await axios.get(`https://api.github.com/users/${username}`);
      const userData = response.data;

      // Insere os dados no banco de dados
      await db.none('INSERT INTO users_github(id, name, location) VALUES($1, $2, $3)', [userData.id, userData.name, userData.location]);

      console.log(`Dados dos usuários ${username} inseridas no banco de dados.`);
    }

    // Consulta e exibe todos os registros da tabela
    const result = await db.any('SELECT * FROM users_github');
    console.log('tabela selecionado:');
    console.table(result);
  } catch (error) {
    console.error('Erro ao acessar a API do GitHub ou inserir no banco de dados:', error.message);
  } finally {
    // Encerra a conexão com o banco de dados
    pgp.end();
  }
}

// Chama a função com o array de usuários
const username = ['vitaly-t','clarabez', 'Ramonleles-lab','mateus','julio','maria'];
fetchDataFromGitHub(username);