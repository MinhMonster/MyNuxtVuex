<template>
  <client-only>
    <HomePage
      title="Danh Mục Bài Viết"
      goBack
      reload
      @reload="reload()"
      notBoder
    >
      <template #body>
        <div class="mt-4">
          <BaseFormSearch
            :module="module"
            @search="reload"
            ref="search"
            hiddenReset
          />
          <TopicList :module="module" ref="table" class="topics page-body" />
        </div>
      </template>
    </HomePage>
  </client-only>
</template>

<script>
import HomePage from "@/components/pages/home/HomePage";
import Pagination from "@/components/global/molecules/common/Pagination";
import TopicList from "@/components/pages/topic/TopicList";

export default {
  layout: "clientLayout",
  components: {
    HomePage,
    Pagination,
    TopicList,
  },
  methods: {
    async reload() {
      await this.$refs.table.fetchDataIndex();
    },
    reset() {
      this.$refs.search.reset();
    },
  },
  data() {
    return {
      module: "client/topics",
      title:
        "Danh Mục Bài Viết, Tổng Hợp và Chia Sẻ Các Kinh Nghiệm Chơi Game",
    };
  },
  head() {
    return {
      title: this.title,
      meta: [
        { hid: "description", name: "description", content: this.title },
        { property: "og:title", content: this.title },
        { property: "og:description", content: this.title },
        { property: "og:image", content: "/banner.jpg" },
      ],
    };
  },
};
</script>
<style lang="scss" scoped>
#home-page {
  max-width: 700px;
}
</style>
