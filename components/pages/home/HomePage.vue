<template>
  <div id="home-page">
    <Loading v-if="loading" />
    <v-row v-else>
      <v-col cols="12" md="12" :lg="colLeft">
        <div
          class="page-body"
          :class="{ 'full-screen': fullScreen, 'not-border': notBoder }"
        >
          <div :class="{ 'page-info': fullScreen }">
            <div v-if="title" class="title-page title text-center">
              {{ title }}
            </div>
            <small
              v-if="content"
              id="fileHelp"
              class="form-text text-muted text-center"
              >{{ content }}</small
            >
            <div v-if="goBack" class="go-back" @click="onGoBack()">
              <v-btn v-if="!isGoHome" icon>
                <BaseSvg name="next-left" />
              </v-btn>
              <v-btn v-else icon>
                <v-icon>mdi-home</v-icon>
              </v-btn>
            </div>
            <div v-if="reload" class="reload" @click="onReload()">
              <v-btn icon>
                <BaseSvg name="reload" />
              </v-btn>
            </div>
            <slot name="body"></slot>
          </div>
        </div>
      </v-col>
      <v-col v-if="colRight" cols="12" md="12" :lg="colRight">
        <slot name="col-right"></slot>
      </v-col>
      <v-col v-if="table" cols="12" md="12" lg="12">
        <slot name="table"></slot>
      </v-col>
    </v-row>
    <div id="next-bottom"></div>
  </div>
</template>
  
<script>
import Loading from "@/components/global/molecules/common/Loading";

import { mapFields } from "vuex-map-fields";
import { mapState } from "vuex";

export default {
  components: { Loading },
  props: {
    title: {
      type: String,
      default: null,
    },
    content: {
      type: String,
      default: null,
    },
    pathGoBack: {
      type: String,
      default: null,
    },
    queryGoBack: {
      type: String,
      default: null,
    },
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
    colRight: {
      type: Number,
      default: null,
    },
    table: Boolean,
    description: {
      type: String,
      default: null,
    },
    keywords: {
      type: String,
      default: null,
    },
    image: {
      type: String,
      default: null,
    },
  },
  computed: {
    ...mapState("global", ["oldPath", "nowPath"]),
    ...mapFields("global", {
      ready: "ready",
    }),
    isGoHome() {
      return this.goHome;
    },
  },
  mounted() {
    // window.addEventListener("wheel", this.scroll());
  },
  methods: {
    // ...mapActions("global", ["setPath"]),
    // nextPath() {
    //   const path = this.$route.path;
    //   this.setPath(path);
    // },

    async onGoBack() {
      if (this.isGoHome) {
        this.$router.push("/");
      } else if (this.pathGoBack && this.queryGoBack) {
        await this.$router.push(`${this.pathGoBack}?${this.queryGoBack}`);
      } else {
        const { from } = this.$route.query;
        if (from) this.$router.push(from);
        else await this.$router.go(-1);
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
.title-page {
  padding: 0 30px;
}
</style>