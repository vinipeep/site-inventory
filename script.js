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
    "MG-ZEBRAMASTER-ZP01"
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