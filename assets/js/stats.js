let categoChk = [];
let categorias = [];
let data = { currentDate: "", events: [] };
const input = document.querySelector('input[type="search"]');

const fragmentE = document.createDocumentFragment();
const containerE = document.getElementsByClassName("event");

function creoEvent(data, contenedor) {
  let tr = document.createElement("tr");
  let eventMayor = data.events.sort((a, b) => {
    return (
      Number.parseFloat(
        b.assistance ? b.assistance / b.capacity : b.estimate / b.capacity
      ) -
      Number.parseFloat(
        a.assistance ? a.assistance / a.capacity : a.estimate / a.capacity
      )
    );
  })[0].name;

  let eventMenor = data.events.sort((a, b) => {
    return (
      Number.parseFloat(
        a.assistance ? a.assistance / a.capacity : a.estimate / a.capacity
      ) -
      Number.parseFloat(
        b.assistance ? b.assistance / b.capacity : b.estimate / b.capacity
      )
    );
  })[0].name;

  let eventCapacity = data.events.sort((a, b) => {
    return Number.parseFloat(b.capacity) - Number.parseFloat(a.capacity);
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
  let filtrado = [];

  for (let i = 0; i < datos.events.length; i++) {
    if (datos.currentDate > datos.events[i].date) continue;

    filtrado.push(datos.events[i]);
  }

  categorias = [...new Set(filtrado.map((item) => item.category))].sort();

  contenedor[0].innerHTML = "";

  for (let i = 0; i < categorias.length; i++) {
    let capacity = filtrado
      .filter((item) => item.category === categorias[i])
      .reduce(
        (sum, value) =>
          typeof value.capacity == "number" ? sum + value.capacity : sum,
        0
      );

    let estimate =
      (filtrado
        .filter((item) => item.category === categorias[i])
        .reduce(
          (sum, value) =>
            typeof value.estimate == "number" ? sum + value.estimate : sum,
          0
        ) *
        100) /
      capacity;

    let ingresos = filtrado
      .filter((item) => item.category === categorias[i])
      .reduce(
        (sum, value) =>
          typeof value.price == "number"
            ? sum + value.estimate * value.price
            : sum,
        0
      )
      .toLocaleString();

    let tr = document.createElement("tr");
    tr.innerHTML += `
        <td>${categorias[i]}</td>
        <td>$ ${ingresos}</td>
        <td>${estimate.toFixed(2)} %</td>
    `;
    fragmentU.appendChild(tr);
  }
  contenedor[0].appendChild(fragmentU);
}

const fragmentP = document.createDocumentFragment();
const containerP = document.getElementsByClassName("past");

function creoPast(datos, contenedor) {
  let filtrado = [];

  for (let i = 0; i < datos.events.length; i++) {
    if (datos.currentDate <= datos.events[i].date) continue;

    filtrado.push(datos.events[i]);
  }

  categorias = [...new Set(filtrado.map((item) => item.category))].sort();

  contenedor[0].innerHTML = "";

  for (let i = 0; i < categorias.length; i++) {
    let capacity = filtrado
      .filter((item) => item.category === categorias[i])
      .reduce(
        (sum, value) =>
          typeof value.capacity == "number" ? sum + value.capacity : sum,
        0
      );

    let assistance =
      (filtrado
        .filter((item) => item.category === categorias[i])
        .reduce(
          (sum, value) =>
            typeof value.assistance == "number" ? sum + value.assistance : sum,
          0
        ) *
        100) /
      capacity;

    let ingresos = filtrado
      .filter((item) => item.category === categorias[i])
      .reduce(
        (sum, value) =>
          typeof value.price == "number"
            ? sum + value.assistance * value.price
            : sum,
        0
      )
      .toLocaleString();

    let tr = document.createElement("tr");
    tr.innerHTML += `
        <td>${categorias[i]}</td>
        <td>$ ${ingresos}</td>
        <td>${assistance.toFixed(2)} %</td>
    `;
    fragmentP.appendChild(tr);
  }
  contenedor[0].appendChild(fragmentP);
}

async function getData() {
  await fetch("./assets/amazing.json")
    .then((res) => res.json())
    .then((res) => (data = res));

  creoEvent(data, containerE);
  creoUpcoming(data, containerU);
  creoPast(data, containerP);
}

getData();
