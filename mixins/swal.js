
export default {
  methods: {
    async showSwal(input) {
      const customClass = {
        customClass: {
          container: this.isThemeDark ? "swal-dark" : (this.isThemeRed ? "swal-red" : ""),
        }
      }
      const setting = Object.assign(input, customClass);
      this.$swal.fire(setting);
    },
  },
};
