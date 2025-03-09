document.getElementById('formCadastro').addEventListener('submit', function (event) {
    event.preventDefault();  // Impede o envio normal do formulário

    const nome = document.getElementById('nome').value;
    const placa = document.getElementById('placa').value;
    const modelo = document.getElementById('modelo').value;
    const cpf = document.getElementById('cpf').value;

    const car = {
        nome: nome,
        placa: placa,
        modelo: modelo,
        cpf: cpf
    };

    // Verificação simples no frontend
    if (!nome || !placa || !modelo || !cpf) {
        alert('Todos os campos são obrigatórios!');
        return;
    }

    // Log dos dados
    console.log('Dados a serem enviados:', car);

    // Enviar os dados para o servidor
    fetch('http://localhost:3001/cadastrar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(car)
    })
    .then(response => response.json())
    .then(data => {
        if (data.message) {
            alert(data.message);
        }
    })
    .catch(error => {
        console.error('Erro ao cadastrar o carro:', error);
    });
});
