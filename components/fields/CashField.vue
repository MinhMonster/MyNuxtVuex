<template>
  <form-validator :name="name">
    <v-text-field
      :label="form.title"
      :model-value="displayValue"
      disabled
      density="compact"
    />
  </form-validator>
</template>

<script>
import FormValidator from "@/components/global/form/FormValidator";

export default {
  name: "CashField",
  components: { FormValidator },

  props: {
    dataForm: Object,
    form: Object,
    name: String,
  },

  computed: {
    displayValue() {
      const base = Number(this.dataForm?.[this.form.from] || 0);
      const rate = Number(this.form.rate || 1);
      return this.format_number(base * rate) + " đ";
    },
  },
};
</script>
