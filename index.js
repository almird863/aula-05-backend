const path = require('path')
const mongoose = require('mongoose')
const express = require('express');
const cors = require('cors');
require('dotenv').config({ path: path.join(__dirname, ".env") })

const app = express();

app.use(cors());
app.use(express.json());

const linkDb = process.env.MONGO_URI

mongoose.connect(linkDb)
    .then(function () {
        console.log("Conectado com sucesso ao Mongo DB na Nuvem!")
    })
    .catch(function (err) {
        console.error("Erro ao conectar com MongoDB:", err)
    })

const usuarioSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    cargo: { type: String, required: true }
})

const usuario = mongoose.model('Usuario', usuarioSchema)

// // [GET] Listar todos
// app.get('/usuarios', function (requisicao, response) {
//     return response.json(usuarios);
// });

app.get('/usuarios', (req, res) => {
    usuario.find()
        .then((users) => {
            return res.json(users)
        })
        .catch((err) => {
            return res.status(500).json({ erro: "Erro ao acessar o banco de dados" })
        })
})

// [POST] Criar um novo
// app.post('/usuarios', function (requisicao, response) {
//     const dadosRecebidos = requisicao.body;
//     const novoUsuario = {
//         nome: dadosRecebidos.nome,
//         cargo: dadosRecebidos.cargo
//     };
//     usuarios.push(novoUsuario);
//     return response.status(201).json(novoUsuario);
// });

app.post('/usuarios', (req,res) => {
    const dados = req.body
    
    usuario.create({
        nome: dados.nome,
        cargo: dados.cargo
    })
        .then((newUser) => {
            return res.status(201).json(newUser)
        })
        .catch((err) => {
            return res.status(400).json({ erro: "Erro ao salvar usuário no banco" })
        })

})

// [PUT] Atualizar pelo Nome
// Rota para o recebimento do parametro de texto
// app.put('/usuarios/:nomeParametro', function (requisicao, response) {
//     // decodeURIComponent limpa os espaços e caracteres da URL (ex: "Ana%20Costa" vira "Ana Costa")
//     const nomeParametro = decodeURIComponent(requisicao.params.nomeParametro);
//     const dadosNovos = requisicao.body;
//     // Procura o usuário na lista ignorando letras maiúsculas ou minúsculas
//     const usuarioEncontrado = usuarios.find(function (u) {
//         return u.nome.toLowerCase() === nomeParametro.toLowerCase(); });
//     // Se o usuário não for encontrado no array, retorna o erro 404 explicitamente
//     if (!usuarioEncontrado) {
//         return response.status(404).json({ erro: "Usuário não encontrado no sistema" });}
//     // Aplica os novos dados recebidos do formulário do frontend
//     usuarioEncontrado.nome = dadosNovos.nome;
//     usuarioEncontrado.cargo = dadosNovos.cargo;
//     return response.json(usuarioEncontrado);
// });

app.put('/usuarios/:nome', (req, res) => {
    const dados = req.body
})

// [DELETE] Remover pelo Nome
// app.delete('/usuarios/:nomeParametro', function (requisicao, response) {
//     const nomeParametro = decodeURIComponent(requisicao.params.nomeParametro);

//     const listaFiltrada = usuarios.filter(function (u) {
//         return u.nome.toLowerCase() !== nomeParametro.toLowerCase();
//     });

//     if (listaFiltrada.length === usuarios.length) {
//         return response.status(404).json({ erro: "Usuário não encontrado" });
//     }

//     usuarios = listaFiltrada;
//     return response.status(204).send();
// });

const PORTA = 3000;
app.listen(PORTA, function () {
    console.log(`🚀 Backend (Ajustado) rodando em http://localhost:${PORTA}`);
});