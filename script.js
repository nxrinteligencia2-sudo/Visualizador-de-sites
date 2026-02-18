document.getElementById('render-btn').addEventListener('click', async function() {
    const fileInput = document.getElementById('file-input');
    const iframe = document.getElementById('viewer-frame');
    const files = Array.from(fileInput.files);

    if (files.length === 0) {
        alert("Selecione os arquivos!");
        return;
    }

    const htmlFile = files.find(f => f.name.endsWith('.html'));
    if (!htmlFile) {
        alert("Faltou o arquivo .html!");
        return;
    }

    let htmlContent = await htmlFile.text();

    // Mapeia os arquivos e cria as URLs
    files.forEach(file => {
        if (file !== htmlFile) {
            const blobUrl = URL.createObjectURL(file);
            
            // Este comando substitui "imagem.jpg" E TAMBÉM "./imagem.jpg"
            const nomeSimples = file.name;
            htmlContent = htmlContent.split(`./${nomeSimples}`).join(blobUrl);
            htmlContent = htmlContent.split(nomeSimples).join(blobUrl);
        }
    });

    iframe.srcdoc = htmlContent;
});
