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
    "MG-ZEBRAMASTER-ZP01", "MG-ZEBRA-MASTER-RD01", "MG-ZEBRA-UNITARIA-RD01", "MG-ZEBRA-MASTER-LO06", "MG-ZEBRA-UNITARIA-LO06", 
    "MG-ZEBRA-RECEBIMENTO-G10", "MG-ZEBRA-RECEBIMENTO-PRODUCAO" 
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

    const inputMaterial = document.getElementById('inputMaterial');
    const inputDescricao = document.getElementById('inputDescricao');
    const inputQuantidade = document.getElementById('inputQuantidade');
    const inputValorUnitario = document.getElementById('inputValorUnitario');
    const inputLinha = document.getElementById('inputLinha');
    const selectStatus = document.getElementById('selectStatus');

    const mat = inputMaterial.value.trim();
    const desc = inputDescricao.value.trim();
    const qtdTexto = inputQuantidade.value.trim();
    const valUnitTexto = inputValorUnitario.value.trim();
    const lin = inputLinha.value.trim();
    const status = selectStatus.value;

    if (mat === "" || desc === "" || qtdTexto === "" || valUnitTexto === "" || lin === "") {
        alert("Por favor, preencha todos os campos antes de inserir!");
        return;
    }

    const quantidade = parseFloat(qtdTexto);
    const valorUnitario = parseFloat(valUnitTexto);
    const valorTotal = quantidade * valorUnitario;

    const valorUnitFormatado = "R$ " + valorUnitario.toFixed(2).replace('.', ',');
    const valorTotalFormatado = "R$ " + valorTotal.toFixed(2).replace('.', ',');

    const corpoTabela = document.getElementById('corpoTabela');
    const linhaVazia = document.getElementById('linhaVazia');

    if (linhaVazia) {
        linhaVazia.remove();
    }

    const novaLinha = document.createElement('tr');

    let classeStatus = "";
    if (status === "Entrada") {
        classeStatus = "status-entrada";
    } else if (status === "Saída") {
        classeStatus = "status-saida";
    }

    novaLinha.innerHTML = `
        <td>${mat}</td>
        <td>${desc}</td>
        <td>${quantidade}</td>
        <td>${valorUnitFormatado}</td>
        <td><strong>${valorTotalFormatado}</strong></td>
        <td>${lin}</td>
        <td class="${classeStatus}">${status}</td>
    `;

    corpoTabela.appendChild(novaLinha);

    inputMaterial.value = "";
    inputDescricao.value = "";
    inputQuantidade.value = "";
    inputValorUnitario.value = "";
    inputLinha.value = "";
    selectStatus.value = "Entrada"; 
    inputMaterial.focus();
});

document.getElementById('btnLimparTabela').addEventListener('click', function() {

    if (confirm("Tem certeza que deseja apagar todos os dados da tabela?")) {
        const corpoTabela = document.getElementById('corpoTabela');

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

    if (document.getElementById('linhaVazia')) {
        alert("Insira dados na tabela antes de copiar!");
        return;
    }

    botao.innerText = "📸 Copiando...";
    botao.disabled = true;

    html2canvas(elementoTabela, {
        scale: 2, 
        backgroundColor: "#ffffff" 
    }).then(canvas => {
        
        canvas.toBlob(function(blob) {
            try {
                const item = new ClipboardItem({ "image/png": blob });
                

                navigator.clipboard.write([item]).then(function() {
                    // Sucesso!
                    botao.innerText = "✅ Copiado! Pode colar (Ctrl+V)";
                    botao.style.backgroundColor = "#0f9d58"; 
                    
                    resetarBotao();
                }).catch(err => {
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

    const textoColado = (e.clipboardData || window.clipboardData).getData('text');

    const colunas = textoColado.split('\t');

    if (colunas.length > 1) {

        e.preventDefault();

        const inputMaterial = document.getElementById('inputMaterial');
        const inputDescricao = document.getElementById('inputDescricao');
        const inputQuantidade = document.getElementById('inputQuantidade');
        const inputValorUnitario = document.getElementById('inputValorUnitario');
        const inputLinha = document.getElementById('inputLinha');

        if (colunas[0]) inputMaterial.value = colunas[0].trim().toUpperCase();
        if (colunas[1]) inputDescricao.value = colunas[1].trim().toUpperCase();
        if (colunas[2]) inputQuantidade.value = colunas[2].trim();
        
        if (colunas[3]) inputValorUnitario.value = colunas[3].trim().replace('R$', '').replace('.', '').replace(',', '.').trim(); 
        if (colunas[4]) inputLinha.value = colunas[4].trim().toUpperCase();

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

const API_URL = "https://script.google.com/macros/s/AKfycbxkdQctfwxd6BUSHJsWG16eQmZ08E6D7StocGk6cDCUY8QnUxU33JIlB82gjLGNDBOG/exec";

function buscarDadosPlanilha() {
  fetch(API_URL)
    .then(response => response.json())
    .then(dados => {
      console.log("Dados da planilha:", dados);
    })
    .catch(error => console.error("Erro ao buscar dados:", error));
}

function enviarParaPlanilha(novoItem) {
  fetch(API_URL, {
    method: "POST",
    mode: "no-cors",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(novoItem)
  })
  .then(() => {
    console.log("Dados enviados para a planilha com sucesso!");
  })
  .catch(error => console.error("Erro ao enviar:", error));
}
