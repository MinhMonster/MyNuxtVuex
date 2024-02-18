<template>
  <div class="text-center container-fluid">
    <v-row justify="center">
      <v-col cols="12">
        <v-pagination
          v-if="meta && meta.per_page > 1"
          v-model="page"
          :length="meta.pages"
          rounded="circle"
          :total-visible="7"
          @input="onChange"
        ></v-pagination>
      </v-col>
    </v-row>
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
