document.getElementById('render-btn').addEventListener('click', function() {
    const fileInput = document.getElementById('file-input');
    const iframe = document.getElementById('viewer-frame');

    if (fileInput.files.length === 0) {
        alert("Por favor, selecione um arquivo HTML primeiro!");
        return;
    }

    // Procuramos o arquivo HTML entre os arquivos selecionados
    const files = Array.from(fileInput.files);
    const htmlFile = files.find(f => f.name.endsWith('.html'));

    if (htmlFile) {
        const reader = new FileReader();
        
        reader.onload = function(e) {
            // Injeta o conteúdo do arquivo no Iframe
            iframe.srcdoc = e.target.result;
        };

        reader.readAsText(htmlFile);
    } else {
        alert("Selecione pelo menos um arquivo .html");
    }
});
