<template>
  <client-only>
    <HomePage
      title="Danh Mục Bài Viết"
      titleHead="Danh Mục Bài Viết, Tổng Hợp và Chia Sẻ Các Kinh Nghiệm Chơi Game"
      :loading="!ready"
      goBack
      reload
      @reload="getTopics()"
    >
      <template v-if="ready" #body>
        <div class="mt-4">
          <ul class="topics-list">
            <li v-for="(item, index) in topics" :key="index">
              <nuxt-link :to="`/topics/${item.link}`">
                <span class="text-main text-15-400">
                  {{ item.title }}
                </span>
              </nuxt-link>
              <!-- <hr /> -->
            </li>
          </ul>

          <div v-if="!topics.length" class="text-center">
            <span>Bạn chưa có bài đăng nào!</span>
          </div>
          <Pagination
            v-if="metaTopics && metaTopics.pages > 1"
            :meta="metaTopics"
            @change="onPageChange"
          ></Pagination>
        </div>
      </template>
    </HomePage>
  </client-only>
</template>

<script>
import HomePage from "@/components/pages/home/HomePage";
import Pagination from "@/components/global/molecules/common/Pagination";

import { mapFields } from "vuex-map-fields";
import { mapActions, mapState } from "vuex";

export default {
  layout: "clientLayout",
  components: {
    HomePage,
    Pagination,
  },
  computed: {
    ...mapState("home/topics", ["topics", "metaTopics"]),
    ...mapFields("global", {
      ready: "ready",
    }),
    queryPage() {
      return _.cloneDeep(this.$route.query.page) || 1;
    },
    queryGoBack() {
      return `page=2`;
    },
    pathGoBack() {
      return "/topics";
    },
  },

  mounted() {
    this.getTopics();
  },
  methods: {
    ...mapActions("home/topics", ["fetchTopics", "setQuery", "resetQuery"]),
    async getTopics() {
      this.onPageChange(this.queryPage);
    },
    async onPageChange(page) {
      this.ready = false;
      await this.setQuery({ page });
      await this.fetchTopics();
      page == 1 || !page
        ? await this.$router.push(`/topics`)
        : await this.$router.push(`/topics?page=${page}`);
      this.ready = true;
    },
  },
};
</script>
<style lang="scss" scoped>
#home-page {
  max-width: 800px;
}
ul.topics-list {
  li {
    // list-style-type: circle;
    // margin-left: 30px;
    // margin-top: 10px;
    padding: 7px;

    // padding: 5px 20px;
    &:nth-of-type(odd) {
      background: #ffcf9c !important;
    }
  }
  hr {
    margin: 3px auto;
  }
}
</style>
