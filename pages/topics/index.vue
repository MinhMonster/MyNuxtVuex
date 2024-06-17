<template>
  <client-only>
    <HomePage
      title="Danh Mục Bài Viết"
      :loading="!ready"
      goBack
      reload
      @reload="getTopics()"
    >
      <template v-if="ready" #body>
        <div class="mt-4 topics">
          <ul class="topics-list">
            <li v-for="(item, index) in topics" :key="index">
              <nuxt-link :to="`/topics/${item.link}`">
                <v-row>
                  <v-col cols="4">
                    <!-- <img :src="item.image" alt="" /> -->
                    <div
                      class="image-topic"
                      :style="{ backgroundImage: `url(${item.image})` }"
                    ></div>
                  </v-col>
                  <v-col cols="8">
                    <div class="text-main text-14-700">
                      {{ item.title }}
                    </div>
                    <div
                      class="break-line-2 text-main text-13-400"
                      :class="isMobile ? 'break-line-2' : 'break-line-3'"
                    >
                      <div v-html="item.description"></div>
                    </div>
                  </v-col>
                </v-row>
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
    Pagination
  },
  computed: {
    ...mapState("home/topics", ["topics", "metaTopics"]),
    ...mapFields("global", {
      ready: "ready"
    }),
    queryPage() {
      return _.cloneDeep(this.$route.query.page) || 1;
    },
    queryGoBack() {
      return `page=2`;
    },
    pathGoBack() {
      return "/topics";
    }
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
      page && page == 1
        ? await this.$router.push(`/topics`)
        : await this.$router.push(`/topics?page=${page}`);
      this.ready = true;
    }
  },
  data() {
    return {
      title:
        "Danh Mục Bài Viết, Tổng Hợp và Chia Sẻ Các Kinh Nghiệm Chơi Game TeaMobile"
    };
  },
  head() {
    return {
      title: this.title,
      meta: [
        { hid: "description", name: "description", content: this.title },
        { property: "og:title", content: this.title },
        { property: "og:description", content: this.title },
        { property: "og:image", content: "/banner.jpg" }
      ]
    };
  }
};
</script>
<style lang="scss" scoped>
#home-page {
  max-width: 700px;
}
</style>
