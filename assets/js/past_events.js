import data from "./data.js";

let arrayC = [];
let categorias = {};
let categoChk = [];
const input = document.querySelector('input[type="search"]');

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

function creoCards(datos, contenedor) {
  contenedor[0].innerHTML = "";

  for (let i = 0; i < datos.length; i++) {
    if (data.currentDate <= datos[i].date) continue;

    arrayC.push(datos[i].category);

    let div = document.createElement("div");
    div.className =
      "col-lg-3 col-md-4 col-sm-6 mb-3 d-flex align-items-stretch";
    div.innerHTML += `
        <div class="card">
            <img src="${datos[i].image}" class="card-img-top" alt="Card Image">
            <div class="card-body d-flex flex-column">
                <h5 class="card-title">${datos[i].name}</h5>
                <p class="card-text">${datos[i].description}</p>
                <div class="card-footer d-flex flex-row justify-content-between align-items-center">
                    <p>Price $${datos[i].price}</p>
                    <a href="./details.html?id=${datos[i]._id}" class="btn btn-primary mt-auto align-self-start see-more">See more...</a>
                </div>
            </div>
        </div>
    `;
    fragment.appendChild(div);
  }

  if (datos.length <= 0) {
    let div = document.createElement("div");
    div.className = "d-flex align-items-center justify-content-center";
    div.innerHTML += `
        <div class="card">
            <img src="https://img.freepik.com/vector-premium/plantilla-pagina-web-error-404-lindo-gato_540634-1.jpg" class="card-img-top" alt="Card Image" style="object-fit:contain">
            <div class="card-body d-flex flex-column">
                <h5 class="card-title">NOT FOUND</h5>
                <p class="card-text"></p>
                
            </div>
        </div>
    `;
    fragment.appendChild(div);
  }

  categorias = [...new Set(arrayC)].sort();

  contenedor[0].appendChild(fragment);
}

function filtroData() {
  let arrays = data.events;
  if (categoChk.length > 0)
    arrays = data.events.filter((item) => categoChk.includes(item.category));

  if (input.value.length > 0)
    arrays = arrays.filter((item) =>
      item.name.toLocaleLowerCase().includes(input.value.toLocaleLowerCase())
    );

  creoCards(arrays, container);
}

creoCards(data.events, container);
creoCategorias(categorias, containerC);

let checkboxes = document.querySelectorAll("input[type=checkbox]");

checkboxes.forEach(function (checkbox) {
  checkbox.addEventListener("change", function () {
    categoChk = Array.from(checkboxes)
      .filter((i) => i.checked)
      .map((i) => i.value);
    filtroData();
  });
});

input.addEventListener("keyup", () => {
  filtroData();
});

//este es para la cruz de borrado dentro del searchbox
input.addEventListener("search", () => {
  filtroData();
});
