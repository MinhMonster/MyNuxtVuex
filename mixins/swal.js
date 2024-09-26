
export default {
  methods: {
    async showSwal(input) {
      const customClass = {
        customClass: {
          container: this.isDark ? "swal-dark" : "",
        }
      }
      const setting = Object.assign(input, customClass);
      this.$swal.fire(setting);
    },
  },
};
