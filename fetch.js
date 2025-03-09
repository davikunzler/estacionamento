async function fetchCarros() {
    try {
        const response = await fetch('http://localhost:3001/listar');
        if (!response.ok) throw new Error('Falha ao carregar carros');
        return await response.json();
    } catch (error) {
        console.error('Erro ao carregar carros:', error);
    }
}

async function fetchCarro(url, method, body = null) {
    try {
        const options = {
            method: method,
            headers: { 'Content-Type': 'application/json' },
        };
        if (body) options.body = JSON.stringify(body);

        const response = await fetch(url, options);
        if (!response.ok) throw new Error(`Erro ao ${method} o carro`);

        return await response.json();
    } catch (error) {
        console.error(error);
    }
}
