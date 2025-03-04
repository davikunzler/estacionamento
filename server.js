const express = require('express');
const cors = require('cors');
const dotenv = require("dotenv");
// const { default: Errors } = require('undici-types/errors');
const mysql = require('mysql')
const app = express();
app.use(express.json());
app.use(cors());

const port = 3001

app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));


const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'estacionamento'
});

connection.connect((err) => {
    if (err){
        console.log('Erro ao conectar com o banco', err)}
    else{
        console.log('Banco conectado')
    };
});
// serve para ter acesso do navegador aos arquivos



app.get('/', (req,res) =>{
    console.log('Hello World!!')
});

app.post('/cadastrar', (req,res) =>{
    const {name, placa, modelo, cpf} = req.body;

    if(!name || !placa || !modelo || !cpf){
        return res.status(400).json({ error: 'Todos os campos são obrigatórios' });

    }

    const query = 'INSERT INTO cars(name, placa, modelo, cpf) VALUES (?, ?, ?, ?)';
    connection.query(query, [name, placa, modelo, cpf], (err, results) =>{
        if (err){
            console.log('Erro ao inserir os dados no banco:' , err);
            return res.status(500).json({error : ' Erro ao salvar dados no banco'})
        }
        res.status(201).json({ message: 'Dados cadastrados com sucesso' });

    });
});

app.get('/listar', (req, res) =>{
    const query = 'SELECT * FROM cars';
    connection.query(query, (err, results) => {
        if (err){
            console.error('Erro ao listar carros', err);
            return res.status(500).json({  error: 'Erro ao buscar carros no banco'});
        }
        res.json(results);
    });
});


