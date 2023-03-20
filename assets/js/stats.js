let categoChk = [];
let categorias = [];
let data = { currentDate: "", events: [] };
const input = document.querySelector('input[type="search"]');

const fragmentE = document.createDocumentFragment();
const containerE = document.getElementsByClassName("event");

function creoEvent(data, contenedor) {
  let tr = document.createElement("tr");
  let eventMayor = data.events.sort((a, b) => {
    return Number.parseInt(b.assistance) - Number.parseInt(a.assistance);
  })[0].name;

  let eventMenor = data.events.sort((a, b) => {
    return Number.parseInt(a.assistance) - Number.parseInt(b.assistance);
  })[0].name;

  let eventCapacity = data.events.sort((a, b) => {
    return Number.parseInt(b.capacity) - Number.parseInt(a.capacity);
  })[0].name;

  tr.innerHTML += `
        <td>${eventMayor}</td>
        <td>${eventMenor}</td>
        <td>${eventCapacity}</td>
    `;
  fragmentE.appendChild(tr);
  contenedor[0].appendChild(fragmentE);
}

const fragmentU = document.createDocumentFragment();
const containerU = document.getElementsByClassName("upcoming");

function creoUpcoming(datos, contenedor) {
  contenedor[0].innerHTML = "";

  for (let i = 0; i < datos.length; i++) {
    let tr = document.createElement("tr");
    tr.innerHTML += `
        <td></td>
        <td></td>
        <td></td>
    `;
    fragmentU.appendChild(tr);
  }
  contenedor[0].appendChild(fragmentU);
}

const fragmentP = document.createDocumentFragment();
const containerP = document.getElementsByClassName("past");

function creoPast(datos, contenedor) {
  contenedor[0].innerHTML = "";

  for (let i = 0; i < datos.length; i++) {
    let tr = document.createElement("tr");
    tr.innerHTML += `
        <td></td>
        <td></td>
        <td></td>
    `;
    fragmentP.appendChild(tr);
  }
  contenedor[0].appendChild(fragmentP);
}

async function getData() {
  await fetch("./assets/amazing.json")
    .then((res) => res.json())
    .then((res) => (data = res));

  categorias = [...new Set(data.events.map((item) => item.category))].sort();

  creoEvent(data, containerE);
}

getData();
