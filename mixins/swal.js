import { mapFields } from "vuex-map-fields";

export default {
  computed: {
    ...mapFields("global", {
      isThemeDark: "isThemeDark",
    }),
  },

  methods: {
    async showSwal(input) {
      const customClass = {
        customClass: {
          container: this.isThemeDark ? "swal-dark" : "",
        }
      }
      const setting = Object.assign(input, customClass);
      this.$swal.fire(setting);
    },
  },
};
