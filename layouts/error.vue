<template>
  <client-only>
    <template v-if="error.statusCode === 404">
      <Error404></Error404>
    </template>
    <template v-else>
      <Error502></Error502>
    </template>
  </client-only>
</template>

<script>
import Error404 from "@/components/pages/home/Error404";
import Error502 from "@/components/pages/home/Error502";

export default {
  name: "EmptyLayout",
  layout: "clientLayout",
  components: {
    Error404,
    Error502,
  },
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      pageNotFound: "Trang Không Tồn Tại",
      otherError: "Có Lỗi Xảy Ra",
    };
  },
  head() {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError;
    return {
      title,
    };
  },
};
</script>

<style lang="scss" scoped>
::v-deep {
  #home-page {
    max-width: 800px !important;
  }
}
</style>
