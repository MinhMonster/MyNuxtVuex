<template>
  <client-only>
    <HomePage
      title="Nội dung Bài Viết"
      :description="topic?.description"
      :keywords="topic?.keywords"
      :image="topic?.image"
      :loading="!ready"
      goBack
      reload
      @reload="reloadTopic"
    >
      <template v-if="ready" #body>
        <div class="topic mt-4">
          <h1 class="title text-center">{{ topic.title }}</h1>
          <div v-html="topic.content" class="mt-4" />
        </div>
      </template>
    </HomePage>
  </client-only>
</template>

<script>
import HomePage from "@/components/pages/home/HomePage";

export default {
  components: { HomePage },
  layout: "clientLayout",

  async asyncData({ store, params, error }) {
    try {
      const slug = params.slug;
      await store.dispatch("home/topics/fetchTopic", slug);

      const topic = store.state.home.topics.topic;

      if (!topic) {
        return error({ statusCode: 404, message: "Topic not found" });
      }

      return { topic, ready: true };
    } catch (e) {
      return error({ statusCode: 500, message: "Load topic failed" });
    }
  },

  data() {
    return {};
  },

  methods: {
    async reloadTopic() {
      this.ready = false;
      await this.$store.dispatch(
        "home/topics/fetchTopic",
        this.$route.params.slug
      );
      this.topic = this.$store.state.home.topics.topic;
      this.ready = true;
    },
  },

  head() {
    return {
      title: this.topic?.title,
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.topic?.description || "",
        },
        { property: "og:title", content: this.topic?.title || "" },
        { property: "og:description", content: this.topic?.description || "" },
        {
          property: "og:image",
          content: this.topic?.image || "/banner.jpg",
        },
      ],
    };
  },
};
</script>
<style lang="scss" scoped>
#home-page {
  max-width: 800px;
}
::v-deep {
  .topic {
    p {
      margin-bottom: 0 !important;
    }
    ul {
      padding-left: 24px;
      // li {
      // }
    }
  }
}
</style>
