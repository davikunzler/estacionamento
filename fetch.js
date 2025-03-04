// load cars list
async function loadCars() {
    try {
        const response = await fetch('/list');
        if (!response.ok) 
        throw new Error('Erro ao carregar a lista');
        const cars = await response.json();

        const tableBody = document.querySelector('#carTable tbody');
        if(!tableBody){
            console.error('Não foi encontrado o elemento tbody');
            return;
        }

        tableBody.innerHTML = '';
        cars.forEach(car => {
            const row = document.createElement('tr');
            row.innerHTML = `
            <td>${car.name}</td>
            <td>${car.placa}</td>
            <td>${car.modelo}</td>
            <td>${car.cpf}</td>
            <td>
            <a href="/form?placa=${car.placa}" class="button">Editar</a>
            <button class="button delete" onclick="deleteCar('${car.placa}')">Excluir</button>
            </td>
            `;
            // nao possui a ultima parte de edit e exc
            tableBody.appendChild(row);
        });
    }
    catch (error){
        console.error('Erro ao carregar a lista dos carros:', error);
        alert('Erro ao carregar a lista dos carros')
    }
}

// save a car on db
const saveCar = document.getElementById('saveCar');
if(saveCar){
    saveCar.addEventListener('submit', async function (event) {
        event.preventDefault();

        const name = getElementById('name').value;
        const placa = getElementById('placa').value;
        const modelo = getElementById('modelo').value;
        const cpf = getElementById('cpf').value;

        if(!name || !placa || !modelo || !cpf){
            alert('Todos campos precisam ser preenchidos');
            return;
        }

        const car = { name, placa, modelo, cpf };
        const urlParams = new URLSearchParams(window.location.search);
        const placaEdicao = urlParams.get('placa');
        const url = placaEdicao ? `/cadastrar/${placaEdicao}` : '/cadastrar';
        const method = placaEdicao ? 'PUT' : 'POST';
    
        try {
        const response = await fetch(url, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(car),
        });
    
        if (response.ok) {
            alert(placaEdicao ? 'Carro atualizado com sucesso!' : 'Carro salvo com sucesso!');
            window.location.href = '/';
        } else {
            throw new Error('Erro ao salvar/atualizar o carro.');
        }
        } catch (error) {
        console.error('Erro ao salvar/atualizar carro:', error);
        alert('Erro ao salvar/atualizar o carro.');
        }

    })

}

async function fillFormForEdit() {
    const urlParams = new URLSearchParams(window.location.search);
    const placa = urlParams.get('placa');

    if (placa) {
    try {
        const response = await fetch(`/cadastrar/${placa}`);
        if (!response.ok) throw new Error('Erro ao carregar dados do carro.');
        const car = await response.json();

        // preenche o formulário com os dados do carro
        document.getElementById('name').value = car.name;
        document.getElementById('placa').value = car.placa;
        document.getElementById('modelo').value = car.modelo;
        document.getElementById('cpf').value = car.cpf;
    } catch (error) {
        console.error('Erro ao carregar dados do carro:', error);
        alert('Erro ao carregar dados do carro.');
    }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname === '/') loadCars();
    else if (window.location.pathname === '/form') fillFormForEdit();
});