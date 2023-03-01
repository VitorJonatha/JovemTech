const {Sequelize,sequelize } = require('./db')

const db = require('./db')

const Comment = db.sequelize.define('comentarios',{
    titulo: {
        type: db.Sequelize.STRING
    },
    conteudo:{
        type: db.Sequelize.TEXT
    }

})

module.exports = Comment

//Comanso para criar a tabela, executar só uma vez.
//Comment.sync({force: true})