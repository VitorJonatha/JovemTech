const express = require("express");
const app = express();
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const Comment = require('./models/comment')

//Config
//Template Engine
app.engine('handlebers', handlebars.engine({defaultLayout: 'main'}));
app.set('view engine', 'handebars');
//Budy Parser
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
//Rotas Inicial

app.get('/',function(req,res){
    Comment.findAll({order:[['id','DESC']]}).then(function(comments){
        res.render('home', {comments:comments})
    })
})

//Rota do formulário
app.get('/form',function(req,res){
    res.render('formulario.handlebars')
})
//Rotas "post" só pode ser acessada quando alguém faz uma requisição
app.post('/add',function(req,res){
    Comment.create({
        titulo: req.body.titulo,
        conteudo: req.body.conteudo
        }).then(function(){
            res.redirect('/')
    }).catch(function(erro){
        res.send("Comentario não pode ser criado" + erro)
    })
})
//Rota para deletar comentários
app.get('/deletar/:id',function(req,res){
    Comment.destroy({where: {'id':req.params.id}}).then(function(){
        res.redirect('/')
    }).catch(function(erro){
        res.send('Ocorreu um erro')
    })
})

app.listen(3036,function () {
    console.log("servidor rodando na porta http://localhost:3036/add");
});
