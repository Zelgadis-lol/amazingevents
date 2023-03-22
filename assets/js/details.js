const queryString = window.location.search;
const params = new URLSearchParams(queryString);
const ID = params.get("id");

const { createApp } = Vue;

createApp({
  data() {
    return {
      vueDatos: [],
      vueDatosFilter: undefined,
    };
  },
  created() {
    fetch("./assets/amazing.json")
      .then((res) => res.json())
      .then((res) => {
        this.vueDatos = res.events;
        this.vueDatosFilter = res.events.find((item) => item._id == ID);
      });
  },
  methods: {},
}).mount("#vue");
