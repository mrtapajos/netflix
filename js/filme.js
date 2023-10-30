const API_KEY = "api_key=b4b5f9d98442f11bbdd50a5adf70f1d1";
const BASE_URL = "https://api.themoviedb.org/3/";
const IMG_URL = "https://image.tmdb.org/t/p/w500";
const language = "language=pt-BR";

const id_filme = localStorage.getItem("id_filme");
console.log(id_filme);

async function captarFilme() {
  let response = await fetch(
    `${BASE_URL}/movie/${id_filme}?${API_KEY}&${language}`
  );
  data = response.json();
  console.log(data);

  return data;
}

async function exibirFilmeDetalhes() {
  const filme = await captarFilme();

  // Definindo valores
  let nota_media = Math.floor(filme.vote_average * 10);
  let relevancia =
    nota_media >= 70 ? "bom" : nota_media >= 50 ? "medio" : "ruim";

  // Título
  const tituloFilme = document.querySelector("#titulo-filme");
  tituloFilme.textContent = filme.title;

  // Conteúdo
  const conteudoFilme = document.querySelector("#conteudo-filme");

  const conteudoFilmeContainer = document.createElement("div");
  conteudoFilmeContainer.id = "conteudo-filme-container"; // ID
  conteudoFilme.innerHTML = `
        <span>${filme.overview}</span>
        <br>
        <span>Gêneros: ${filme.genres.map((genre) => " " + genre.name)}</span>
        <br>
        <span class=${relevancia}>${nota_media}% gostaram desse filme</span>`;
  conteudoFilme.appendChild(conteudoFilmeContainer);
  conteudoFilme.classList.add("not-show")

  // Background com poster do filme
  const backgroundContainer = document.querySelector("#background-container");
  backgroundContainer.style.setProperty("--background-image", `url(${IMG_URL + filme.backdrop_path})`)

  
}
exibirFilmeDetalhes();
