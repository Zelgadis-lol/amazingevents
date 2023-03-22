const { createApp } = Vue;

createApp({
  data() {
    return {
      vueDatos: [],
      vueDatosFilter: undefined,
      vueCategorias: [],
      textoBus: "",
      checked: [],
    };
  },
  created() {
    fetch("./assets/amazing.json")
      .then((res) => res.json())
      .then((res) => {
        let resulDatos = [];
        let arrayC = [];

        for (let i = 0; i < res.events.length; i++) {
          if (res.currentDate <= res.events[i].date) continue;

          arrayC.push(res.events[i].category);
          resulDatos.push(res.events[i]);
        }

        this.vueDatos = resulDatos;
        this.vueDatosFilter = resulDatos;
        this.vueCategorias = [...new Set(arrayC)].sort();
      });
  },
  methods: {
    filtro() {
      this.vueDatosFilter = this.vueDatos.filter((item) => {
        return (
          (this.checked.includes(item.category) || this.checked.length === 0) &&
          item.name.toLowerCase().includes(this.textoBus.toLowerCase())
        );
      });
    },
  },
}).mount("#vue");
