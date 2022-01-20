let app = new Vue({
  el: "#app",
  data: {
    show: true,
  },
  computed: {
    label() {
      return !this.show ? "show" : "hide";
    },
  },
  created() {},
  mounted() {},
  methods: {},
});
