const axios = require('axios');
const pgp = require('pg-promise')();

// Configuração da conexão com o PostgreSQL
const db = pgp('postgres://postgres:1234@127.0.0.1:5432/users_github');


async function selectItemFromDatabase(userId) {
  try {         
    // Consulta e exibe todos os registros da tabela
    const result = await db.one('SELECT id, name, location FROM users_github WHERE id = $1', [userId]);
    console.log('usuário selecionado:');
    console.table(result);
  } catch (error) {
    console.error('Erro ao acessar a API do GitHub ou inserir no banco de dados:', error.message);
  } finally {
    // Encerra a conexão com o banco de dados
    pgp.end();
  }
}

// Chama a função com o array de usuários
selectItemFromDatabase(5108906);