<template>
  <v-row class="container-fluid">
    <v-col lg="12">
      <b-pagination
        v-if="meta && meta.per_page > 1"
        to="#home-page"
        :value="meta.page"
        pills
        :total-rows="meta.count"
        :per-page="meta.per_page"
        class="pagination-rounded justify-content-center"
        @change="onChange"
      ></b-pagination>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    meta: {
      type: Object,
      required: true,
    },
  },
  methods: {
    onChange(page) {
      this.$emit("change", page);
      // this.nextTop()
    },
    // nextTop() {
    //   const element = document.getElementById("home-page");
    //   element.scrollIntoView();
    // },
  },
};
</script>
<style lang="scss" scoped>
::v-deep {
  .pagination {
    .page-item {
      .page-link {
        color: #ffffff;
        border: 1px solid #663019;
        background: #e28637;
      }
      &.active {
        .page-link {
          background: #663019;
        }
      }
    }
  }
}
</style>