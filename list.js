document.addEventListener('DOMContentLoaded', async () => {
    await carregarLista();
});

async function carregarLista() {
    const lista = document.querySelector('.lista');

    const res = await fetch('http://localhost:3001/listar');
    const carros = await res.json();

    lista.innerHTML = `
        <div class="item cabecalho">
            <span class="col">Nome</span>
            <span class="col">Placa</span>
            <span class="col">Modelo</span>
            <span class="col">CPF</span>
            <span class="col">Ações</span>
        </div>
    `;

    carros.forEach(car => {
        const item = document.createElement('div');
        item.classList.add('item');

        item.innerHTML = `
            <span class="col">${car.nome}</span> 
            <span class="col">${car.placa}</span> 
            <span class="col">${car.modelo}</span> 
            <span class="col">${car.cpf}</span>
            <button class="button edit" onclick="editCar('${car.placa}', '${car.nome}', '${car.modelo}', '${car.cpf}')">Editar</button>
            <button class="button delete" onclick="deleteCar('${car.placa}')">Excluir</button>
        `;

        lista.appendChild(item);
    });
}

async function deleteCar(placa) {
    if (confirm('Tem certeza que deseja excluir este carro?')) {
        await fetch(`http://localhost:3001/excluir/${placa}`, {
            method: 'DELETE',
        });

        await carregarLista(); // Atualiza a lista após exclusão
    }
}

function editCar(placa, nome, modelo, cpf) {
    const novoNome = prompt("Novo nome:", nome);
    const novoModelo = prompt("Novo modelo:", modelo);
    const novoCpf = prompt("Novo CPF:", cpf);

    if (novoNome && novoModelo && novoCpf) {
        fetch(`http://localhost:3001/editar/${placa}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nome: novoNome, modelo: novoModelo, cpf: novoCpf })
        }).then(response => response.json())
          .then(data => {
              alert(data.message);
              carregarLista(); // Atualiza a lista após edição
          })
          .catch(error => console.error('Erro ao editar carro:', error));
    }
}
