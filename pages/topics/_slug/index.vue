<template>
  <HomePage
    title="Nội dung Bài Viết"
    :loading="isLoading"
    goBack
    reload
    @reload="reloadTopic"
  >
    <template v-if="topic" #body>
      <div class="topic mt-4">
        <h1 class="title text-center">{{ topic.title }}</h1>
        <div class="mt-4" v-html="topic.content" />
      </div>
    </template>
  </HomePage>
</template>

<script>
import HomePage from "@/components/pages/home/HomePage";

function stripHtml(html = "") {
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export default {
  components: { HomePage },
  layout: "clientLayout",
  data() {
    return {
      isLoading: false,
    };
  },
  async asyncData({ params, error, $repositories }) {
    try {
      const res = await $repositories.clientTopics.fetch(params.slug);
      const topic = res?.data?.response ?? null;

      if (!topic) {
        error({ statusCode: 404, message: "Không tìm thấy bài đăng" });
        return;
      }

      return { topic };
    } catch (err) {
      if (err.response?.status === 404) {
        error({ statusCode: 404, message: "Không tìm thấy bài đăng" });
        return;
      }

      error({ statusCode: 500, message: "Đã có lỗi xảy ra!" });
    }
  },

  methods: {
    async reloadTopic() {
      try {
        this.isLoading = true;
        const res = await this.$repositories.clientTopics.fetch(
          this.$route.params.slug
        );
        this.topic = res?.data?.response ?? this.topic;
        setTimeout(() => {
          this.isLoading = false;
        }, 500);
      } catch {
        // silent
      }
    },
  },

  head() {
    if (!this.topic) return {};

    const description = stripHtml(this.topic.description).slice(0, 160);

    return {
      title: this.topic.title,
      meta: [
        {
          hid: "description",
          name: "description",
          content: description || "",
        },
        {
          hid: "og:title",
          property: "og:title",
          content: this.topic.title,
        },
        {
          hid: "og:description",
          property: "og:description",
          content: description || "",
        },
        {
          hid: "og:image",
          property: "og:image",
          content: this.topic.thumbnail || "/banner.jpg",
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
