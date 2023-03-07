import data from "./data.js";

let arrayC = [];
let categorias = {};

const fragmentC = document.createDocumentFragment();
const containerC = document.getElementsByClassName("categorias");

function creoCategorias(data, contenedorC) {
  for (let i = 0; i < data.length; i++) {
    let div = document.createElement("div");
    div.innerHTML += `
        <label for="cat${i}">${data[i]}</label>
        <input
            type="checkbox"
            id="cat${i}"
            value="${data[i]}"
            name="categoria"
        />
    `;
    fragmentC.appendChild(div);
  }
  contenedorC[0].appendChild(fragmentC);
}

const fragment = document.createDocumentFragment();
const container = document.getElementsByClassName("row");

function creoCards(data, contenedor) {
  for (let i = 0; i < data.events.length; i++) {
    if (data.currentDate > data.events[i].date) continue;

    arrayC.push(data.events[i].category);

    let div = document.createElement("div");
    div.className =
      "col-lg-3 col-md-4 col-sm-6 mb-3 d-flex align-items-stretch";
    div.innerHTML += `
        <div class="card">
            <img src="${data.events[i].image}" class="card-img-top" alt="Card Image">
            <div class="card-body d-flex flex-column">
                <h5 class="card-title">${data.events[i].name}</h5>
                <p class="card-text">${data.events[i].description}</p>
                <div class="card-footer d-flex flex-row justify-content-between align-items-center">
                    <p>Price $${data.events[i].price}</p>
                    <a href="#" class="btn btn-primary mt-auto align-self-start see-more">See more...</a>
                </div>
            </div>
        </div>
    `;
    fragment.appendChild(div);
  }

  categorias = [...new Set(arrayC)].sort();
  
  contenedor[0].appendChild(fragment);
}

creoCards(data, container);
creoCategorias(categorias, containerC);
