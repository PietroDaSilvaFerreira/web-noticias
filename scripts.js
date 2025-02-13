const key = "b8713bf7023c941a00030000ea4073a1"
const menulateral = document.getElementById('menu-lateral')
const menuexpandido = document.getElementById('menu-expandido');

async function chamadaApi(inputValue) {
    const site = `https://gnews.io/api/v4/search?q=${inputValue}&token=${key}`;
    const resp = await fetch(site)
    if (resp.status === 200) {
        const obj = await resp.json()
        console.log(obj)
        mostrarResultados(obj.articles);
    }
}

function mostrarResultados(articles) {
    const container = document.querySelector(".resultados");
    container.innerHTML = "";

    articles.forEach(article => {
        const div = document.createElement("div");
        div.classList.add("noticia");

        div.innerHTML = `
            <h3 class="title-noticia">${article.title}</h3>
            <img src="${article.image}" alt="Imagem da notícia">
            <p class="description">${article.description || "Sem descrição disponível."}</p>
            <a href="${article.url}" target="_blank">Leia mais</a>
        `;

        container.appendChild(div);
    });
}

function valorDoInput() {
    let inputValue = document.querySelector(".barra-de-pesquisa").value.trim();
    if (inputValue) {
        chamadaApi(inputValue);
    }
}

document.querySelector(".barra-de-pesquisa").addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        valorDoInput();
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const buttons = document.querySelectorAll(".category-btn");

    buttons.forEach(button => {
        button.addEventListener("click", function () {
            const category = this.textContent;
            chamadaApi(category);
        });
    })
});

function voltarAoTopo() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

menulateral.addEventListener('click', function () {
    this.classList.toggle('active');
    menuexpandido.classList.toggle('active')
})