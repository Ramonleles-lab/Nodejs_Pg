    const axios = require('axios');
    const pgp = require('pg-promise')();

    // Configuração da conexão com o PostgreSQL
    const db = pgp('postgres://postgres:1234@127.0.0.1:5432/users_github');

    async function selectUsersByLocation(location) {
        try {
        // Consulta para selecionar usuários com base na localização
        const result = await db.any('SELECT id, name, location FROM users_github WHERE location = $1', [location]);
    
        console.log(`Usuários na localização ${location}:`);
        result.forEach(user => {
            console.log(`ID: ${user.id}, Name: ${user.name}, Location: ${user.location}`);
            console.table(result);
        });
    
        if (result.length === 0) {
            console.log('Nenhum usuário encontrado nesta localização.');
        }
        } catch (error) {
        console.error('Erro ao selecionar usuários por localização na tabela:', error.message);
        } finally {
        // Encerra a conexão com o banco de dados
        pgp.end();
        }
    }
    
    // Substitua 'users_github' pelo nome real da sua tabela, 'seu-usuario', 'senha' e 'seu-banco-de-dados' pelos seus próprios valores
    // Substitua 'Brazil' pela localização desejada
    selectUsersByLocation('Manaus Amazonas Brazil');