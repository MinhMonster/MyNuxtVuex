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
              :total-visible="7"
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
      console.log(page);
      this.$emit("change", page);
    },
  },
};
</script>
<style lang="scss" scoped>
</style>

<!-- <template>
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
</style> -->