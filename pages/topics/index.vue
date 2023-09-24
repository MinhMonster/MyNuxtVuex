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
        <div class="mt-4">
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
                    <div class="break-line-2 text-main text-13-400">
                      {{ item.description }}
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
  data() {
    return {
      title:
        "Danh Mục Bài Viết, Tổng Hợp và Chia Sẻ Các Kinh Nghiệm Chơi Game TeaMobile",
    };
  },
  head() {
    return {
      title: this.title,
      meta: [
        { hid: "description", name: "description", content: this.title },
        { property: "og:title", content: this.title },
        { property: "og:description", content: this.title },
      ],
    };
  },
};
</script>
<style lang="scss" scoped>
#home-page {
  max-width: 700px;
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
    .image-topic {
      display: block;
      position: relative;
      width: 100%;
      height: 120px;
      background-size: cover;
      background-position: center center;
      background-repeat: no-repeat;
      z-index: 1;
      opacity: 1;
      transition: opacity 0.35s ease, filter 0s ease;

      img {
        width: 100%;
        max-height: 120px;
      }
    }
    @media (max-width: 600px) {
      .image-topic {
        height: 80px;
        img {
          width: 100%;
          max-height: 80px;
        }
      }
    }
    pre {
      white-space: pre;
    }
  }
  hr {
    margin: 3px auto;
  }
}
</style>
