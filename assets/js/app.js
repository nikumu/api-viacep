document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    const cepInput = document.querySelector('#cep');
    const addressDiv = document.querySelector('#address');

    const formatCEP = (cep) => cep.replace(/\D/g, '').slice(0, 8);

    const formatAddress = (data) => {
        return `
            <strong>Logradouro:</strong> ${data.logradouro}<br>
            <strong>Bairro:</strong> ${data.bairro}<br>
            <strong>Cidade:</strong> ${data.localidade}<br>
            <strong>Estado:</strong> ${data.uf}<br>
            <strong>DDD:</strong> ${data.ddd}
        `;
    };

    const showMessage = (message, isError = false) => {
        addressDiv.innerHTML = message;
        addressDiv.style.display = 'block';
        addressDiv.style.backgroundColor = isError ? '#ffebee' : '#e8f5e9';
        addressDiv.style.color = isError ? '#c62828' : '#2e7d32';
    };

    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        const cep = formatCEP(cepInput.value);

        if (cep.length !== 8) {
            showMessage('Por favor, digite um CEP válido com 8 dígitos.', true);
            return;
        }

        try {
            const response = await fetch(`https://viacep.com.br/ws/${cep}/json`);
            const data = await response.json();

            if (data.erro) {
                throw new Error('CEP não encontrado');
            }

            showMessage(formatAddress(data));
        } catch (error) {
            showMessage('CEP inválido ou não encontrado. Por favor, tente novamente.', true);
        }
    });

    cepInput.addEventListener('input', (event) => {
        event.target.value = formatCEP(event.target.value);
    });
});

