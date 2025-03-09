const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
app.use(express.json());
app.use(cors());

// Conexão com o banco de dados MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',     // Seu usuário do MySQL
    password: 'root', // Sua senha do MySQL
    database: 'estacionamento' // Nome do banco de dados
});

// Verifica se a conexão foi estabelecida com sucesso
db.connect(err => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err.stack);
        return;
    }
    console.log('Conectado ao banco de dados');
});

// Rota para cadastrar carro
app.post('/cadastrar', (req, res) => {
    const { nome, placa, modelo, cpf } = req.body;

    if (!nome || !placa || !modelo || !cpf) {
        return res.status(400).send({ message: 'Todos os campos são obrigatórios!' });
    }

    db.query('INSERT INTO cars (nome, placa, modelo, cpf) VALUES (?, ?, ?, ?)', 
        [nome, placa, modelo, cpf], 
        (err, result) => {
            if (err) {
                console.error('Erro ao salvar no banco:', err);
                return res.status(500).send({ message: 'Erro ao cadastrar o carro.' });
            }
            res.status(201).send({ message: 'Carro cadastrado com sucesso!' });
        }
    );
});

// Rota para listar os carros
app.get('/listar', (req, res) => {
    const sql = 'SELECT * FROM cars';

    db.query(sql, (err, rows) => { 
        if (err) {
            console.error('Erro ao buscar os carros:', err.message);
            return res.status(500).json({ message: 'Erro ao buscar os carros' });
        }
        res.json(rows);
    });
});

// Rota para excluir um carro
app.delete('/excluir/:placa', (req, res) => {
    const { placa } = req.params;

    const query = 'DELETE FROM cars WHERE placa = ?';
    db.query(query, [placa], (err, results) => {
        if (err) return res.status(500).send({ message: 'Erro ao excluir o carro' });
        if (results.affectedRows === 0) {
            return res.status(404).send({ message: 'Carro não encontrado!' });
        }
        res.send({ message: 'Carro excluído com sucesso!' });
    });
});

// Rota para editar um carro
app.put('/editar/:placa', (req, res) => {
    const { placa } = req.params;
    const { nome, modelo, cpf } = req.body;

    if (!nome || !modelo || !cpf) {
        return res.status(400).send({ message: 'Todos os campos são obrigatórios!' });
    }

    const sql = 'UPDATE cars SET nome = ?, modelo = ?, cpf = ? WHERE placa = ?';

    db.query(sql, [nome, modelo, cpf, placa], (err, result) => {
        if (err) {
            console.error('Erro ao editar carro:', err);
            return res.status(500).send({ message: 'Erro ao editar o carro.' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).send({ message: 'Carro não encontrado!' });
        }
        res.send({ message: 'Carro editado com sucesso!' });
    });
});

// Inicia o servidor
app.listen(3001, () => console.log('Servidor rodando na porta 3001'));
