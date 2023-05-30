const BancoDeDados = require('./ConexaoBD')

const Usuarios = BancoDeDados.sequelize.define('usuarios', {
    id: {
        type: BancoDeDados.Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    nome: {
        type: BancoDeDados.Sequelize.TEXT,
        allowNull: false,
    },
    sobrenome: {
        type: BancoDeDados.Sequelize.TEXT,
        allowNull: false
    },
    idade: {
        type: BancoDeDados.Sequelize.INTEGER,
        allowNull: false
    }
})

//Utilizado somente na primera vez que for executar
//Usuarios.sync({force : true})

module.exports = Usuarios