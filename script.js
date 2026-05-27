const materiais = [
    "MG-ZEBRAMASTER-APONTAMENTO-LOG", "MG-ZEBRAMASTER-MESA-LOCAL-LOG", "MG-ZEBRAUNITARIA-LOG-MESA-01",
    "MG-ZEBRAMASTER-LOG-MESA-02", "MG-ZEBRAMASTER-LOG-MESA-04", "MG-ZEBRA-LO01",
    "MG-ZEBRAMASTER-LO01", "MG-ZEBRAUNITARIA-LO01", "MG-ZEBRA-LO02",
    "MG-ZEBRA-MASTER-LO02", "MG-ZEBRA-UNITARIA-LO02", "MG-ZEBRA-LO03",
    "MG-ZEBRA-MASTER-LO03", "MG-ZEBRA-UNITARIA-LO03", "MG-ZEBRA-LO04",
    "MG-ZEBRA-MASTER-LO04", "MG-ZEBRA-UNITARIA-LO04", "MG-ZEBRA-LO05",
    "MG-ZEBRA-MASTER-LO05", "MG-ZEBRA-UNITARIA-LO05", "MG-ZEBRA-MASTER-LO08B",
    "MG-ZEBRA-UNITARIA-LO08B", "MG-ZEBRA-MASTER-LO08", "MG-ZEBRA-UNITARIA-LO08",
    "MG-ZEBRA-UNITARIA-LO08A", "MG-ZEBRA-MASTER-LO08A", "MG-ZEBRAMASTER-MB05",
    "MG-ZEBRAUNITARIA-MB05", "MG-ZEBRAMASTER-MB06", "MG-ZEBRAUNITARIA-MB06",
    "MG-ZEBRAUNITARIA-MB07", "MG-ZEBRAMASTER-MB07", "MG-ZEBRAMASTER-MB08",
    "MG-ZEBRAUNITARIA-MB08", "MG-ZEBRA-MASTER-MB09", "MG-ZEBRA-UNITARIA-MB09",
    "MG-ZEBRAMASTER-MB10", "MG-ZEBRAUNITARIA-MB10", "MG-ZEBRAMASTER-MB11",
    "MG-ZEBRAUNITARIA-MB11", "MG-ZEBRAUNITARIA-PC01", "MG-ZEBRAMASTER-PC02",
    "MG-ZEBRAMASTER-PC01", "MG-ZEBRAUNITARIA-PC02", "MG-ZEBRA-UNITARIA-PC03",
    "MG-ZEBRA-MASTER-PC03", "MG-ZEBRAMASTER-PC04", "MG-ZEBRAUNITARIA-PC04",
    "MG-ZEBRA-RD", "MG-ZEBRA-MASTER-RD02", "MG-ZEBRA-UNITARIA-RD02",
    "MG-ZEBRA-UNITARIA-ZB05", "MG-ZEBRAMASTER-PD01", "MG-ZEBRAMASTER-PD03",
    "MG-ZEBRAMASTER-PD02", "MG-ZEBRA-SA01-01", "MG-ZEBRA-SA02-02",
    "MG-ZEBRA-SA03-03", "MG-ZEBRA-SA04-04", "MG-AREAKIT-01-Z",
    "MG-AREAKIT-03-Z", "MG-AREAKIT-02-Z", "MG-ZEBRA-AK-CF",
    "MG-ZEBRA-OPPO", "MG-ZEBRA-UNITARIA-APONT-ZTE", "MG-ZEBRA-MASTER-APONT-ZTE",
    "MG-ZEBRAMASTER-ZP01", "MG-ZEBRA-MASTER-RD01", "MG-ZEBRA-UNITARIA-RD01"
];

const input = document.getElementById('search-input');
const list = document.getElementById('results-list');
const count = document.getElementById('results-count');

input.addEventListener('input', () => {
    const termo = input.value.toUpperCase();
    list.innerHTML = "";

    if (termo.length < 2) {
        count.innerText = "";
        return;
    }

    const filtrados = materiais.filter(item => item.includes(termo));
    count.innerText = `${filtrados.length} ENCONTRADOS`;

    filtrados.forEach(item => {
        const li = document.createElement('li');
        li.className = 'item-card';
        
        let tag = "";
        if (item.includes("MASTER")) tag = '<span class="tag tag-m">MASTER</span>';
        else if (item.includes("UNITARIA")) tag = '<span class="tag tag-u">UNITARIA</span>';

        li.innerHTML = `
            <div class="item-info">
                <span>${item}</span>
                ${tag}
            </div>
            <button class="copy-btn">COPIAR</button>
        `;

        const btn = li.querySelector('.copy-btn');
        btn.onclick = () => {
            navigator.clipboard.writeText(item);
            const originalText = btn.innerText;
            btn.innerText = "COPIADO";
            btn.style.borderColor = "var(--neon-green)";
            btn.style.color = "var(--neon-green)";
            
            setTimeout(() => {
                btn.innerText = originalText;
                btn.style.borderColor = "var(--neon-blue)";
                btn.style.color = "var(--neon-blue)";
            }, 2000);
        };

        list.appendChild(li);
    });
});


document.getElementById('btnEnviar').addEventListener('click', function() {
    // 1. Captura os elementos do formulário
    const inputMaterial = document.getElementById('inputMaterial');
    const inputDescricao = document.getElementById('inputDescricao');
    const inputQuantidade = document.getElementById('inputQuantidade');
    const inputValorUnitario = document.getElementById('inputValorUnitario');
    const inputLinha = document.getElementById('inputLinha');
    const selectStatus = document.getElementById('selectStatus');

    // 2. Pega os valores limpos
    const mat = inputMaterial.value.trim();
    const desc = inputDescricao.value.trim();
    const qtdTexto = inputQuantidade.value.trim();
    const valUnitTexto = inputValorUnitario.value.trim();
    const lin = inputLinha.value.trim();
    const status = selectStatus.value;

    // 3. Validação: Todos os campos são obrigatórios
    if (mat === "" || desc === "" || qtdTexto === "" || valUnitTexto === "" || lin === "") {
        alert("Por favor, preencha todos os campos antes de inserir!");
        return;
    }

    // 4. Cálculos Matemáticos Automáticos
    const quantidade = parseFloat(qtdTexto);
    const valorUnitario = parseFloat(valUnitTexto);
    const valorTotal = quantidade * valorUnitario;

    // Formata os números para o padrão de dinheiro do Brasil (R$ 0,00)
    const valorUnitFormatado = "R$ " + valorUnitario.toFixed(2).replace('.', ',');
    const valorTotalFormatado = "R$ " + valorTotal.toFixed(2).replace('.', ',');

    // 5. Gerencia as linhas da tabela
    const corpoTabela = document.getElementById('corpoTabela');
    const linhaVazia = document.getElementById('linhaVazia');

    if (linhaVazia) {
        linhaVazia.remove();
    }

    // 6. Cria a nova linha da planilha
    const novaLinha = document.createElement('tr');

    // Define qual classe de cor o Status vai receber
    let classeStatus = "";
    if (status === "Entrada") {
        classeStatus = "status-entrada";
    } else if (status === "Saída") {
        classeStatus = "status-saida";
    }

    // Injeta as colunas na tabela (com o Valor Total já calculado)
    novaLinha.innerHTML = `
        <td>${mat}</td>
        <td>${desc}</td>
        <td>${quantidade}</td>
        <td>${valorUnitFormatado}</td>
        <td><strong>${valorTotalFormatado}</strong></td>
        <td>${lin}</td>
        <td class="${classeStatus}">${status}</td>
    `;

    // 7. Adiciona a linha na tabela e limpa o formulário
    corpoTabela.appendChild(novaLinha);

    inputMaterial.value = "";
    inputDescricao.value = "";
    inputQuantidade.value = "";
    inputValorUnitario.value = "";
    inputLinha.value = "";
    selectStatus.value = "Entrada"; // Reseta o menu para a primeira opção

    // Coloca o cursor de volta no primeiro campo
    inputMaterial.focus();
});

document.getElementById('btnLimparTabela').addEventListener('click', function() {
    // Confirma se a pessoa realmente quer apagar tudo
    if (confirm("Tem certeza que deseja apagar todos os dados da tabela?")) {
        const corpoTabela = document.getElementById('corpoTabela');
        
        // Remove todas as linhas de dados
        corpoTabela.innerHTML = `
            <tr id="linhaVazia">
                <td colspan="7" style="text-align: center; color: #999;">Nenhum dado inserido ainda.</td>
            </tr>
        `;
    }
});
document.getElementById('btnCopiarImagem').addEventListener('click', function() {
    const elementoTabela = document.querySelector('.quadrado-resposta');
    const botao = document.getElementById('btnCopiarImagem');

    // Se a tabela estiver vazia, avisa o usuário
    if (document.getElementById('linhaVazia')) {
        alert("Insira dados na tabela antes de copiar!");
        return;
    }

    botao.innerText = "📸 Copiando...";
    botao.disabled = true;

    // 1. Tira o "print" visual da tabela
    html2canvas(elementoTabela, {
        scale: 2, // Melhora a nitidez para não ficar embaçado no WhatsApp
        backgroundColor: "#ffffff" // Garante o fundo branco da planilha
    }).then(canvas => {
        
        // 2. Transforma o print em um formato de imagem que o sistema operacional entende (Blob)
        canvas.toBlob(function(blob) {
            try {
                // 3. Cria o objeto de Área de Transferência contendo a imagem PNG
                const item = new ClipboardItem({ "image/png": blob });
                
                // 4. Alimenta o Ctrl+C do computador com a imagem
                navigator.clipboard.write([item]).then(function() {
                    // Sucesso!
                    botao.innerText = "✅ Copiado! Pode colar (Ctrl+V)";
                    botao.style.backgroundColor = "#0f9d58"; // Muda para verde
                    
                    resetarBotao();
                }).catch(err => {
                    // Erro de permissão do navegador
                    console.error(err);
                    alert("O navegador bloqueou a cópia. Certifique-se de que está testando em um ambiente seguro (https:// ou localhost). Abrir o arquivo direto da pasta do PC bloqueia esse recurso.");
                    resetarBotao();
                });
            } catch (error) {
                alert("Este navegador não suporta copiar imagens direto. Tente usar o Google Chrome ou Microsoft Edge.");
                resetarBotao();
            }
        }, "image/png");
    }).catch(erro => {
        alert("Erro ao processar a imagem da tabela: " + erro);
        resetarBotao();
    });

    function resetarBotao() {
        setTimeout(() => {
            botao.innerText = "📷 Copiar Tabela para o Zap/E-mail";
            botao.style.backgroundColor = "#4285f4";
            botao.disabled = false;
        }, 3500);
    }
});

document.getElementById('inputMaterial').addEventListener('paste', function(e) {
    // 1. Pega o texto que está vindo da área de transferência
    const textoColado = (e.clipboardData || window.clipboardData).getData('text');

    // O Excel separa colunas por "Tabulação" (\t). Vamos quebrar o texto por isso.
    // Se vier do Excel, teremos um array com os dados de cada coluna.
    const colunas = textoColado.split('\t');

    // Se o texto tiver pelo menos 2 colunas, significa que veio de uma tabela
    if (colunas.length > 1) {
        // Evita que o texto bruto seja colado direto no primeiro input
        e.preventDefault();

        // 2. Mapeia os inputs da tela
        const inputMaterial = document.getElementById('inputMaterial');
        const inputDescricao = document.getElementById('inputDescricao');
        const inputQuantidade = document.getElementById('inputQuantidade');
        const inputValorUnitario = document.getElementById('inputValorUnitario');
        const inputLinha = document.getElementById('inputLinha');

        // 3. Distribui os dados colados nos campos (limpando espaços extras e jogando para Maiúsculo se for texto)
        if (colunas[0]) inputMaterial.value = colunas[0].trim().toUpperCase();
        if (colunas[1]) inputDescricao.value = colunas[1].trim().toUpperCase();
        if (colunas[2]) inputQuantidade.value = colunas[2].trim();
        
        // Se a sua tabela de origem tiver também Valor Unitário e Linha nas colunas seguintes:
        if (colunas[3]) inputValorUnitario.value = colunas[3].trim().replace('R$', '').replace('.', '').replace(',', '.').trim(); 
        if (colunas[4]) inputLinha.value = colunas[4].trim().toUpperCase();

        // Dá um aviso sutil no console ou foca no botão de enviar
        document.getElementById('btnEnviar').focus();
    }
});
function mudarAba(evento, nomeAba) {
    const conteudos = document.getElementsByClassName("conteudo-aba");
    for (let i = 0; i < conteudos.length; i++) {
        conteudos[i].classList.remove("ativa");
    }

    const botoes = document.getElementsByClassName("aba-btn");
    for (let i = 0; i < botoes.length; i++) {
        botoes[i].classList.remove("ativa");
    }

    document.getElementById(nomeAba).classList.add("ativa");
    evento.currentTarget.classList.add("ativa");
}