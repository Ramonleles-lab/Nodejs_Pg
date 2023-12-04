const axios = require('axios');
const pgp = require('pg-promise')();

// Configuração da conexão com o PostgreSQL
const db = pgp('postgres://postgres:1234@127.0.0.1:5432/users_github');

async function fetchDataFromGitHub(usernames) {
  try {
    for (const username of usernames) {
      // Faz a requisição à API do GitHub
      const response = await axios.get(`https://api.github.com/users/${username}/repos`);
      const reposData = response.data;

      // Itera sobre os repositórios e insere na tabela
      for (const repo of reposData) {
        const language = repo.language || 'N/A';

        await db.none('INSERT INTO users_github_repo(language) VALUES($1)', [language]);
      }

      console.log(`Dados dos usuários ${username} inseridos no banco de dados.`);
    }

    // Consulta e exibe todos os registros da tabela
    const result = await db.any('SELECT * FROM users_github_repo');
    console.log('Tabela selecionada:');
    console.table(result);
  } catch (error) {
    console.error('Erro ao acessar a API do GitHub ou inserir no banco de dados:', error.message);
  } finally {
    // Encerra a conexão com o banco de dados
    pgp.end();
  }
}

// Chama a função com o array de usuários
const usernames = ['Ramonleles-lab'];
fetchDataFromGitHub(usernames);