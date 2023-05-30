const Sequelize = require('sequelize')
const sequelize = new Sequelize('crudjs', 'root', '', {
    host: 'localhost',
    port: '3307',
    dialect: 'mysql'
})

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}