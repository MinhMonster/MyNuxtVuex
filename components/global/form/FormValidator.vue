<template>
  <div
    class="w-100"
    :class="{
      required: required,
      optional: !required && optional,
    }"
  >
    <legend
      v-if="label"
      class="col-form-label pt-0"
      :data-content="dataContent"
    >
      {{ localizedLabel }}
    </legend>
    <div :class="{ 'has-error': errors.length }">
      <slot></slot>
      <div v-if="errors.length && !alert" class="validation">
        <div v-for="(error, index) in errors" :key="index">
          {{ error }}
        </div>
      </div>
      <ErrorAlert v-if="errors.length && alert" :errors="errors"></ErrorAlert>
    </div>
  </div>
</template>

<script>
import ErrorAlert from "@/components/global/molecules/common/ErrorAlert";
import { createNamespacedHelpers } from "vuex";
const { mapGetters } = createNamespacedHelpers("global");
export default {
  components: {
    ErrorAlert,
  },
  props: {
    label: {
      type: String,
      default: null,
    },
    name: {
      type: String,
      default: null,
    },
    dataContent: {
      type: String,
      default: null,
    },
    alts: {
      type: Array,
      default: () => [],
      description: "To show multiple validate fields, beside of name property",
    },
    required: Boolean,
    optional: Boolean,
    alert: Boolean,
    allowTranslate: {
      type: Boolean,
      default: true,
    },
  },

  computed: {
    errors() {
      const errorsFoundByAlts = this.alts.map((name) => this.getErrors()(name));
      const errorsFoundByName = this.getErrors()(this.name);
      if (errorsFoundByName && errorsFoundByName.length) {
        errorsFoundByAlts.unshift(errorsFoundByName);
      }
      return _.flatten(errorsFoundByAlts).filter(
        (item) => typeof item === "string"
      );
    },
    localizedLabel() {
      return this.allowTranslate ? this.label || this.label : this.label;
    },
  },
  methods: {
    ...mapGetters(["getErrors"]),
  },
};
</script>

<style lang="scss" scoped>
.validation {
  width: 100%;
  padding-left: 10px;
  margin-top: -5px;
  font-size: 80%;
  color: #dc3545;
}
.container.client-main {
  form .field {
    .has-error input.v-input {
      border: 1px solid #dc3545;
    }
    .validation {
      margin-top: 0px;
      padding-bottom: 5px;
      text-align: center;
    }
  }
}
</style>