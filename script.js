const containerVideos = document.querySelector(".videos__container");


async function buscarEMostraVideos(){
    try {
        const busca = await fetch("http://localhost:3000/videos") // -> Vai retornar uma promise.
        const videos = await busca.json() // => Quando receber a resposta dos vídeos da resposta transformada em json.

    /*  .then(res => res.json())
        .then((videos) => // => Quando receber a resposta dos vídeos da resposta transformada em json. */
            videos.forEach( (video) => { // => Para cada vídeo, vai criar um elemento html e adicionar ao container de vídeos.)
                if (video.categoria == "") {
                    throw new Error("Video não tem categoria.");
                }
                containerVideos.innerHTML += ` 
            <li class="videos__item">
                <iframe src="${video.url}" title="${video.titulo}" allowfullscreen></iframe>
                <div class="descricao-video">
                    <img class="img-canal" src="${video.imagem}" alt="Logo do Canal">
                    <h3 class="titulo-video">${video.titulo}</h3>
                    <p class="titulo-canal">${video.descricao}</p>
                    <p class="categoria" hidden>${video.categoria}</p>
                </div>
            </li>
                `; //Inserir dentro do HTML. += -> A cada vídeo ele vai ser acrescentado
            })
    /*  )  
        .catch((error) => { 
            containerVideos.innerHTML = `<p class="erro">Erro ao carregar os vídeos: ${error}</p>`;
        })  */
    } catch (error) {
        containerVideos.innerHTML = `<p class="erro">Erro ao carregar os vídeos: ${error}</p>`;
    }
}

buscarEMostraVideos(); // => Chamando a função

const barraDePesquisa = document.querySelector(".pesquisar__input");

barraDePesquisa.addEventListener("input", filtrarPesquisa); //"Ouvir" o evento de input => Toda vez que alguém escrever algo la caixa, faça algo -> Chamar função filtrar pesquisa.


function filtrarPesquisa() {
    const videos = document.querySelectorAll('.videos__item');
    const valorFiltro = barraDePesquisa.value.toLowerCase();
  
    videos.forEach((video) => {
      const titulo = video.querySelector('.titulo-video').textContent.toLowerCase();
  
      video.style.display = valorFiltro ? titulo.includes(valorFiltro) ? 'block' : 'none' : 'block';
    });
  }

/* function filtrarPesquisa() {
    const videos = document.querySelectorAll(".videos__item"); // => Selecionando todos os vídeos da página de acordo com sua classe.

    if(barraDePesquisa.value != "") {
        for(let video of videos) {
            let titulo = video.querySelector(".titulo-video").textContent.toLowerCase(); // => Selecionando o título do vídeo e transformando em minúsculo para conseguir fazer a comparação.
            let valorFiltro = barraDePesquisa.value.toLowerCase(); // => Selecionando o valor do filtro e transformando em minúsculo para conseguir fazer a comparação. 
            
            if(!titulo.includes(valorFiltro)){
                video.style.display = "none"; // => Se o título não (! no inicio) incluir o valor do filtro, o vídeo vai ser escondido.
            } else {
                video.style.display = "block"; // => Se o título incluir o valor do filtro, o vídeo vai ser mostrado.
            }
        }
    } else {
        video.style.display = "block";
    }
}
 */

const botaoCategoria = document.querySelectorAll(".superior__item");

botaoCategoria.forEach((botao) => {
    let nomeCategoria = botao.getAttribute("name");
    botao.addEventListener("click", () => filtrarPorCategoria(nomeCategoria));
})

function filtrarPorCategoria(filtro) {
    const videos = document.querySelectorAll(".videos__item");
    for(let video of videos) {
        let categoria = video.querySelector(".categoria").textContent.toLowerCase();
        let valorFiltro = filtro.toLowerCase();

        if (!categoria.includes(valorFiltro) && valorFiltro != "tudo"){
            video.style.display = 'none'; 
        } else {
            video.style.display = 'block';
        }
    }
}
        

