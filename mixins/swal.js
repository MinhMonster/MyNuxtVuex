
export default {
  methods: {
    async showSwal(input) {
      const customClass = {
        customClass: {
          container: this.isThemeDark ? "swal-dark" : (this.isThemeRed ? "swal-red" : (this.isThemeBlue ?  "swal-blue" : "")),
        }
      }
      const setting = Object.assign(input, customClass);
      this.$swal.fire(setting);
    },
  },
};
