
export default {
  methods: {
    async showSwal(input = {}) {
      // Set default class based on route path
      const defaultClass = this.path.includes('/admin/') ? 'admin' : '';

      // Create a custom class object with default
      const customClass = {
        customClass: {
          container: defaultClass,
        },
      };

      // Merge input options with custom class (override defaults)
      const setting = Object.assign({}, customClass, input);

      // Call Swal with merged options
      const result = await this.$swal.fire(setting);

      // Return true/false based on confirmed result
      return result.isConfirmed;
    }
  },
};
