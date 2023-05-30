const express = require('express')
const app = express()
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const Usuarios = require('./models/Usuarios')

//Configuração Handle Bars
const handleBars = handlebars.create({
    defaultLayout: 'main',

    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true,
        allowedProtoMethods: true
    }
})
app.engine('handlebars', handleBars.engine)
app.set('view engine', 'handlebars')

//Configuração Body Parser
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

//Rotas da Aplicação
app.get('/', (req, res) => {
    Usuarios.findAll().then((Usuarios) => {
        res.render('home', {Usuarios: Usuarios})
    }).catch((erro) => {
        console.log(erro)
    })
})

app.get('/cadastrar', (req, res) => {
    res.render('formularioCadastro')
})

app.get('/alterar/:id', (req, res) => {
    res.render('alterarDados', {'id': req.params.id})
})

//Rotas para realizar as funções da Aplicação
app.post('/adicionar', (req, res) => {
    Usuarios.create({
        nome: req.body.nome,
        sobrenome: req.body.sobrenome,
        idade: req.body.idade
    }).then(() => {
        console.log('Usuário Cadastrado')
        res.redirect('/')
    }).catch((erro) => {
        console.log(erro)
        console.log('Erro no Cadastro')
    })
})

app.post('/atualizar/:id', (req, res) => {
    Usuarios.update({
        nome: req.body.novoNome,
        sobrenome: req.body.novoSobrenome,
        idade: req.body.novaIdade
    }, {
        where: {'id': req.body.id}
    }).then(() => {
        console.log('Atualização Realizada')
        res.redirect('/')
    }).catch((erro) => {
        console.log(erro)
        console.log('Erro na Atualização')
    })
})

app.get('/deletar/:id', (req, res) => {
    Usuarios.destroy({where: {'id': req.params.id}}).then(() => {
        res.redirect('/')
    }).catch((erro) => {
        console.log(erro)
        console.log('Usuário Inexistente')
    })
})

//Definição da Porta que o CRUD deverá ser Executado
app.listen(8080)