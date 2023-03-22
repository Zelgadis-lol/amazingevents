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
        this.vueDatos = res.events;
        this.vueDatosFilter = res.events;
        this.vueCategorias = [
          ...new Set(res.events.map((item) => item.category)),
        ].sort();
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
