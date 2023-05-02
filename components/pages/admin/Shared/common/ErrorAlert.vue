<template>
  <b-alert show variant="danger" :class="{ showArrow: table }" class="mt-2">
    <ul class="mb-0 pl-2">
      <li v-for="(error, index) in errors" :key="index">
        {{ error }}
      </li>
    </ul>
  </b-alert>
</template>

<script>
export default {
  props: {
    errors: {
      type: Array,
      default: () => [],
    },
    table: Boolean,
  },
};
</script>

<style lang="scss" scoped>
.showArrow {
  border-radius: 0;
  border-top-style: none;
  border-bottom-style: none;
  &::before {
    content: "";
    width: 0;
    height: 0;
    border-bottom: 8px solid #fce1e1;
    border-right: 8px solid transparent;
    border-left: 8px solid transparent;
    top: -8px;
    left: 10px;
    display: block;
    position: absolute;
  }
  &:first-child {
    border-top-left-radius: 0.25rem;
    border-top-right-radius: 0.25rem;
    border-top-style: solid;
  }
  &:last-child {
    border-bottom-left-radius: 0.25rem;
    border-bottom-right-radius: 0.25rem;
    border-bottom-style: solid;
    margin-bottom: 10px !important;
  }
}
.alert-danger {
  color: #f46a6a;
  border-color: #f46a6a;
}
</style>