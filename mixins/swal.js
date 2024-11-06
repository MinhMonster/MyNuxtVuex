
export default {
  methods: {
    async showSwal(input) {
      const customClass = {
        customClass: {
          container: this.path.includes('/admin/') ? "admin" : "",
        }
      }
      const setting = Object.assign(input, customClass);
      this.$swal.fire(setting);
    },
  },
};
