document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('/listar'); // Faz a requisição para o backend
        if (!response.ok) throw new Error('Erro ao carregar a lista');

        const cars = await response.json(); // Converte a resposta para JSON
        const listaContainer = document.querySelector('.lista'); // Obtém o container da lista

        // Remove os itens estáticos da lista
        listaContainer.innerHTML = `
            <div class="item">
                <span class="col">Nome</span> 
                <span class="col">Placa</span> 
                <span class="col">Modelo</span> 
                <span class="col">CPF</span>
                <span class="col">Ações</span>
            </div>
        `;

        // Adiciona cada carro à lista
        cars.forEach(car => {
            const div = document.createElement('div');
            div.classList.add('item');
            div.innerHTML = `
                <span class="col">${car.name}</span> 
                <span class="col">${car.placa}</span> 
                <span class="col">${car.modelo}</span> 
                <span class="col">${car.cpf}</span>
                <span class="col">
                    <a href="/form?placa=${car.placa}" class="button">Editar</a>
                    <button class="button delete" onclick="deleteCar('${car.placa}')">Excluir</button>
                </span>
            `;
            listaContainer.appendChild(div);
        });

    } catch (error) {
        console.error('Erro ao carregar a lista dos carros:', error);
        alert('Erro ao carregar a lista dos carros');
    }
});

// Função para excluir um carro
async function deleteCar(placa) {
    if (!confirm('Tem certeza que deseja excluir este carro?')) return;

    try {
        const response = await fetch(`/cars/${placa}`, { method: 'DELETE' });
        if (!response.ok) throw new Error('Erro ao excluir o carro');

        alert('Carro excluído com sucesso!');
        window.location.reload(); // Recarrega a página para atualizar a lista
    } catch (error) {
        console.error('Erro ao excluir o carro:', error);
        alert('Erro ao excluir o carro.');
    }
}
