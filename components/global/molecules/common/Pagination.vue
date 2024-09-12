<template>
  <div class="text-center container-fluid">
    <v-container>
      <v-row justify="center">
        <v-col cols="12">
          <v-container class="max-width">
            <v-pagination
              v-if="meta && meta.pages > 1"
              v-model="page"
              :length="meta.pages"
              :total-visible="9"
              @input="onChange"
            ></v-pagination>
          </v-container>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  props: {
    meta: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      page: 1,
    };
  },
  watch: {
    "meta.page": {
      async handler(newValue, oldValue) {
        this.page = this.meta.page;
      },
    },
  },
  mounted() {
    this.page = this.meta.page;
  },
  methods: {
    onChange(page) {
      this.$emit("change", page);
    },
  },
};
</script>
<style lang="scss" scoped>
</style>