// Nossa "sacola" que vai guardar os arquivos adicionados aos poucos
let arquivosAcumulados = [];

// Quando o usuário escolhe arquivos
document.getElementById('file-input').addEventListener('change', function(event) {
    const novosArquivos = Array.from(event.target.files);
    
    // Adiciona na sacola apenas se o arquivo ainda não estiver lá
    novosArquivos.forEach(novo => {
        const jaExiste = arquivosAcumulados.find(a => a.name === novo.name);
        if (!jaExiste) {
            arquivosAcumulados.push(novo);
        }
    });

    atualizarListaNaTela();
    
    // Reseta o input para o celular deixar você adicionar o mesmo arquivo de novo se errar
    this.value = ''; 
});

// Função para desenhar a lista de nomes na tela
function atualizarListaNaTela() {
    const lista = document.getElementById('file-list');
    lista.innerHTML = ''; // Limpa antes de redesenhar
    
    arquivosAcumulados.forEach((arquivo, index) => {
        const li = document.createElement('li');
        li.textContent = arquivo.name;
        
        // Botãozinho vermelho pra remover um arquivo específico
        const btnRemover = document.createElement('button');
        btnRemover.textContent = 'X';
        btnRemover.className = 'remove-btn';
        btnRemover.onclick = () => {
            arquivosAcumulados.splice(index, 1); // Tira da sacola
            atualizarListaNaTela(); // Atualiza a tela
        };
        
        li.appendChild(btnRemover);
        lista.appendChild(li);
    });
}

// Botão de Limpar Tudo
document.getElementById('clear-btn').addEventListener('click', () => {
    arquivosAcumulados = []; // Esvazia a sacola
    atualizarListaNaTela();
    document.getElementById('viewer-frame').srcdoc = ''; // Limpa a tela
});

// Botão de Renderizar
document.getElementById('render-btn').addEventListener('click', async function() {
    const iframe = document.getElementById('viewer-frame');
    const htmlFile = arquivosAcumulados.find(f => f.name.endsWith('.html'));

    if (!htmlFile) {
        alert("Ops! Falta adicionar o arquivo .html");
        return;
    }

    let htmlContent = await htmlFile.text();

    arquivosAcumulados.forEach(file => {
        if (file !== htmlFile) {
            const blobUrl = URL.createObjectURL(file);
            const fileName = file.name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // Protege caracteres
            
            // SUPER REGEX: Encontra src="foto.jpg" ou src="./pasta/foto.jpg" e substitui perfeitamente
            const pattern = new RegExp(`(src|href)=["']([^"']*?/)?${fileName}["']`, 'g');
            htmlContent = htmlContent.replace(pattern, `$1="${blobUrl}"`);
        }
    });

    iframe.srcdoc = htmlContent;
});
