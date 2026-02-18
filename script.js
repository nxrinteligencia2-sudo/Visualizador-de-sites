document.getElementById('render-btn').addEventListener('click', async function() {
    const fileInput = document.getElementById('file-input');
    const iframe = document.getElementById('viewer-frame');
    const files = Array.from(fileInput.files);

    // Busca o arquivo HTML principal
    const htmlFile = files.find(f => f.name.endsWith('.html'));

    if (!htmlFile) {
        alert("Erro: Você precisa selecionar pelo menos um arquivo .html");
        return;
    }

    // Lê o conteúdo do arquivo HTML como texto
    let htmlContent = await htmlFile.text();

    // Processa todos os outros arquivos (imagens, css, js)
    files.forEach(file => {
        if (file !== htmlFile) {
            // Cria uma URL temporária para o arquivo
            const blobUrl = URL.createObjectURL(file);
            const fileName = file.name;

            // Substitui referências no HTML (ex: src="foto.jpg" ou href="estilo.css")
            // A regex abaixo lida com caminhos como "./imagem.jpg" ou "imagem.jpg"
            const pattern = new RegExp(`(src|href)=["'](\\./|/)?${fileName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}["']`, 'g');
            htmlContent = htmlContent.replace(pattern, `$1="${blobUrl}"`);
        }
    });

    // Injeta o HTML modificado com as URLs de blob no Iframe
    iframe.srcdoc = htmlContent;
});
