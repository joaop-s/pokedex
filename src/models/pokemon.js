const express = require('express');
const { Sequelize, Model, DataTypes } = require('sequelize');

const app = express();
const PORT = 3000;

// Configurando o Sequelize com SQLite
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'database.sqlite'
});

// Definindo o modelo Pokemon
class Pokemon extends Model {}
Pokemon.init({
    PokedexNumber: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
    },
    Nome: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    Tipo: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    Altura: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    Peso: {
        type: DataTypes.DOUBLE,
        allowNull: false,
    },
    NP: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    sequelize,
    modelName: 'Pokemon',
});

// Sincronizando o modelo com o banco de dados
sequelize.sync()
    .then(() => {
        console.log('Tabela Pokemon criada.');
        
        // Criando uma instância de Pokemon
        const bulbasaur = Pokemon.build({
            PokedexNumber: 1,
            Nome: 'Bulbasaur',
            Tipo: 'Planta',
            Altura: 70,  // em cm
            Peso: 7.0,   // em kg
            NP: 15
        });

        console.log(bulbasaur.toJSON());  // Exibindo os dados do Pokémon
    })
    .catch(error => {
        console.error('Erro ao criar a tabela Pokemon:', error);
    });

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
