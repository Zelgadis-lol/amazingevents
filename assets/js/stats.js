const { createApp } = Vue;

createApp({
  data() {
    return {
      vueDatos: [],
      vueEvent: [],
      vueUpcoming: [],
      vuePast: [],
    };
  },
  created() {
    fetch("./assets/amazing.json")
      .then((res) => res.json())
      .then((res) => {
        this.vueDatos = res.events;

        this.vueEvent = this.creoEvent(res.events);
        this.vueUpcoming = this.creoUpcoming(res);
        this.vuePast = this.creoPast(res);
      });
  },
  methods: {
    creoEvent(datos) {
      let eventMayor = datos.sort((a, b) => {
        return (
          Number.parseFloat(
            b.assistance ? b.assistance / b.capacity : b.estimate / b.capacity
          ) -
          Number.parseFloat(
            a.assistance ? a.assistance / a.capacity : a.estimate / a.capacity
          )
        );
      })[0].name;

      let eventMenor = datos.sort((a, b) => {
        return (
          Number.parseFloat(
            a.assistance ? a.assistance / a.capacity : a.estimate / a.capacity
          ) -
          Number.parseFloat(
            b.assistance ? b.assistance / b.capacity : b.estimate / b.capacity
          )
        );
      })[0].name;

      let eventCapacity = datos.sort((a, b) => {
        return Number.parseFloat(b.capacity) - Number.parseFloat(a.capacity);
      })[0].name;

      const arrayA = {
        mayor: eventMayor,
        menor: eventMenor,
        capacity: eventCapacity,
      };

      return arrayA;
    },
    creoUpcoming(datos) {
      let filtrado = [];
      let result = [];

      for (let i = 0; i < datos.events.length; i++) {
        if (datos.currentDate > datos.events[i].date) continue;

        filtrado.push(datos.events[i]);
      }

      let categorias = [
        ...new Set(filtrado.map((item) => item.category)),
      ].sort();

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

        const arrayA = {
          categoria: categorias[i],
          ingresos: ingresos,
          estimado: estimate.toFixed(2),
        };

        result.push(arrayA);
      }

      return result;
    },
    creoPast(datos) {
      let filtrado = [];
      let result = [];

      for (let i = 0; i < datos.events.length; i++) {
        if (datos.currentDate <= datos.events[i].date) continue;

        filtrado.push(datos.events[i]);
      }

      let categorias = [
        ...new Set(filtrado.map((item) => item.category)),
      ].sort();

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
                typeof value.assistance == "number"
                  ? sum + value.assistance
                  : sum,
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

        const arrayA = {
          categoria: categorias[i],
          ingresos: ingresos,
          assistance: assistance.toFixed(2),
        };

        result.push(arrayA);
      }

      return result;
    },
  },
}).mount("#vue");
