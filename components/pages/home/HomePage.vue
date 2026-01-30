<template>
  <div id="home-page" class="mb-5">
    <Loading v-if="loading" />
    <v-row v-else>
      <v-col cols="12" md="12" :lg="colLeft">
        <main
          class="page-body"
          :class="{ 'full-screen': fullScreen, 'not-border': notBoder }"
          role="main"
        >
          <!-- PAGE HEADER -->
          <header v-if="title || content" class="page-header text-center">
            <!-- MAIN TITLE: ALWAYS H1 -->
            <h1 v-if="title" class="title-page title">
              {{ title }}
            </h1>

            <p v-if="content" class="page-description text-muted">
              {{ content }}
            </p>
          </header>

          <!-- ACTIONS -->
          <div v-if="goBack" class="go-back" @click="onGoBack()">
            <BaseSvg
              v-if="goBack"
              :name="isGoHome ? 'home' : 'next-left'"
              :title="isGoHome ? 'Về trang chủ' : 'Quay lại'"
              aria-label="Quay lại"
            />
          </div>
          <div v-if="reload" class="reload" @click="onReload()">
            <BaseSvg
              v-if="reload"
              name="reload"
              title="Tải lại"
              aria-label="Tải lại"
            />
          </div>

          <!-- BODY -->
          <section class="page-content">
            <slot name="body" />
          </section>
        </main>
      </v-col>
      <!-- RIGHT COLUMN -->
      <v-col v-if="colRight" cols="12" md="12" :lg="colRight">
        <aside role="complementary">
          <slot name="col-right" />
        </aside>
      </v-col>
      <!-- TABLE -->
      <v-col v-if="table" cols="12">
        <section class="page-table">
          <slot name="table" />
        </section>
      </v-col>
    </v-row>
    <div id="next-bottom"></div>
  </div>
</template>

<script>
import Loading from "@/components/global/molecules/common/Loading";

export default {
  components: { Loading },
  props: {
    title: String,
    content: String,

    pathGoBack: String,
    queryGoBack: String,
    goBack: Boolean,
    goHome: Boolean,
    reload: Boolean,
    loading: Boolean,
    fullScreen: Boolean,
    notBoder: Boolean,
    colLeft: {
      type: Number,
      default: 12,
    },
    colRight: Number,
    table: Boolean,
  },
  computed: {
    isGoHome() {
      return this.goHome;
    },
  },
  methods: {
    async onGoBack() {
      if (this.isGoHome) {
        this.$router.push("/");
      } else if (this.pathGoBack && this.queryGoBack) {
        await this.$router.push(`${this.pathGoBack}?${this.queryGoBack}`);
      } else {
        const { from } = this.$route.query;
        from ? this.$router.push(from) : this.$router.go(-1);
      }
      setTimeout(() => {
        this.onReload();
      }, 50);
    },
    onReload() {
      this.$emit("reload");
    },
  },
};
</script>

<style lang="scss" scoped>
.page-header {
  margin-bottom: 12px;
}

.title-page {
  padding: 0 30px;
  font-weight: 700;
}

.page-description {
  margin-top: 4px;
}

.page-content {
  margin-top: 8px;
}
</style>

