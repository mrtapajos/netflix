const API_KEY = "api_key=b4b5f9d98442f11bbdd50a5adf70f1d1";
const BASE_URL = "https://api.themoviedb.org/3/";
const IMG_URL = "https://image.tmdb.org/t/p/w500";
const language = "language=pt-BR";
const home = document.getElementById("home");

window.addEventListener("scroll", showNavOnScroll);
document.addEventListener("mouseup", hideSearch);

let dadosFilmes = [];

async function captarFilmes(categoria) {
  try {
    let resposta = await fetch(
      `${BASE_URL}/movie/${categoria}?${API_KEY}&${language}`,
      {
        method: "GET",
      }
    );
    let dados = await resposta.json();

    return dados.results;
  } catch (err) {
    console.log(err);
  }
}

async function captarSeries() {
  try {
    let resposta = await fetch(`${BASE_URL}/tv/popular?${API_KEY}&${language}`);
    let dados = await resposta.json();

    return dados.results;
  } catch (err) {
    console.log(err);
  }
}

function captarId(id_filme) {
    let id = localStorage.setItem('id_filme', id_filme)
    window.location.href = "filme.html"
    console.log(id)
}

async function mostrarCarrossel(categoria) {
  let filmes = await captarFilmes(categoria);
  let carrossel = document.getElementById(categoria);

  for (let filme of filmes) {
    dadosFilmes.push(filme);

    carrossel.innerHTML += `<img class="filme-img" onclick="captarId(${filme.id})" src="${IMG_URL + filme.poster_path}" />`;
  }
}

async function captarFilme(id) {
  try {
    let resposta = await fetch(
      `${BASE_URL}/movie/${id}?${API_KEY}&${language}`
    );
    let filme = await resposta.json();
    return filme;
  } catch (err) {
    console.log(err);
  }
}

async function mostrarSessaoInicial(id) {
  let filme = await captarFilme(id);
  let avaliacao = Math.floor(filme.vote_average * 10);
  let media = avaliacao >= 70 ? "bom" : avaliacao >= 50 ? "medio" : "ruim";

  home.innerHTML = `
        <div>
            <h2>${filme.title}</h2>
            <span>Gêneros: ${filme.genres.map(
              (genero) => " " + genero.name
            )}</span>
            <p class="${media}">${avaliacao}% gostaram</p>
            <p>${filme.overview}</p>
        </div>
        <img src=${IMG_URL + filme.backdrop_path} />
    `;
}

async function mostrarSessaoAleatoria() {
  let aleatorio = Math.floor(Math.random() * 59);
  let filmeAleatorio = dadosFilmes[aleatorio];

  await mostrarSessaoInicial(filmeAleatorio.id);
}

function voltar(categoria) {
  let carousel = document.getElementById(categoria);
  carousel.scrollLeft -= carousel.offsetWidth - 500;

  hideCarouselRightButton(carousel);
}

function avancar(categoria) {
  let carousel = document.getElementById(categoria);
  carousel.scrollLeft += carousel.offsetWidth - 500;

  hideCarouselRightButton(carousel);
}

function hideCarouselRightButton(carousel) {
  if (carousel.scrollLeft === 0) {
    carousel.previousElementSibling.style.display = "none";

    return;
  }

  carousel.previousElementSibling.style.display = "block";
}

function showSearch() {
  searchContainer.style.border = "1px solid white";
  searchInput.style.width = "25rem";
}

function hideSearch(e) {
  if (!searchContainer.contains(e.target)) {
    searchContainer.style.border = "none";
    searchInput.style.width = "0";
  }
}

function showNavOnScroll() {
  let navigation = document.querySelector("#navigation");

  if (scrollY > 0) {
    navigation.classList.add("scroll");
  } else {
    navigation.classList.remove("scroll");
  }
}


async function chamarFuncoes() {
  await mostrarCarrossel("popular");
  await mostrarCarrossel("top_rated");
  await mostrarCarrossel("upcoming");
  await mostrarSessaoAleatoria();
}

chamarFuncoes();
