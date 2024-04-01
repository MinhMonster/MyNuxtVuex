<template>
  <client-only>
    <HomePage
      title="Nội dung Bài Viết"
      :description="descriptionHead"
      :keywords="keywordsHead"
      :image="imagenHead"
      goBack
      reload
      @reload="getTopic()"
    >
      <template v-if="topic && topicLink == topic.link" #body>
        <div class="topic mt-4">
          <h1 class="title text-center">{{ topic.title }}</h1>
          <div v-html="topic.content" class="mt-4"></div>
        </div>
      </template>
    </HomePage>
  </client-only>
</template>

<script>
import { mapActions, mapState } from "vuex";

import HomePage from "@/components/pages/home/HomePage";

export default {
  components: { HomePage },
  layout: "clientLayout",
  async fetch() {
    await this.getTopic();
  },
  computed: {
    ...mapState("home/topics", ["topic"]),
    topicLink() {
      return this.$route.params.link;
    },
    topicForm() {
      if (this.topic) {
        return cloneDeep(this.topic);
      } else {
        this.$router.push("/topics");
      }
    },
    title() {
      return _.get(this.topic, "title", null);
    },
    descriptionHead() {
      return _.get(this.topic, "description", null);
    },
    keywordsHead() {
      return _.get(this.topic, "keywords", null);
    },
    imagenHead() {
      return _.get(this.topic, "image", null);
    },
  },
  methods: {
    ...mapActions("home/topics", ["fetchTopic"]),
    async getTopic() {
      await this.fetchTopic(this.topicLink);
    },
  },
  head() {
    return {
      title: this.title,
      meta: [
        { hid: "description", name: "description", content: this.title },
        { property: "og:title", content: this.title },
        { property: "og:description", content: this.title },
        {
          property: "og:image",
          content: this.imagenHead
            ? this.imagenHead
            : "/images/banners/banner-blue.png",
        },
      ],
    };
  },
};
</script>
<style lang="scss" scoped>
#home-page {
  max-width: 700px;
}
::v-deep {
  .topic {
    p {
      margin-bottom: 0px !important;
    }
    ul {
      padding-left: 24px;
      // li {
      // }
    }
  }
}
</style>
