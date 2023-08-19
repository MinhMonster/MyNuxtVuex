<template>
  <div id="home-page">
    <Loading v-if="loading" />
    <b-row v-else>
      <b-col md="12" :lg="colLeft">
        <div :class="{ 'full-screen': fullScreen, 'page-body': !notBoder }">
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
                <v-icon>mdi-arrow-left-bold-circle-outline</v-icon>
              </v-btn>
              <v-btn v-else icon>
                <v-icon>mdi-home</v-icon>
              </v-btn>
            </div>
            <div v-if="reload" class="reload" @click="onReload()">
              <v-btn icon>
                <v-icon>mdi-reload</v-icon>
              </v-btn>
            </div>
            <slot name="body"></slot>
          </div>
        </div>
      </b-col>
      <b-col v-if="colRight" md="12" :lg="colRight">
        <slot name="col-right"></slot>
      </b-col>
      <b-col v-if="table" md="12" lg="12">
        <slot name="table"></slot>
      </b-col>
    </b-row>
    <div id="next-bottom"></div>
  </div>
</template>
  
<script>
import Loading from "@/components/global/molecules/common/Loading";

import mixins from "@/mixins/index";

import { mapFields } from "vuex-map-fields";
import { mapState, mapActions } from "vuex";

export default {
  name: "HomePage",
  mixins: [mixins],

  components: { Loading },
  props: {
    title: {
      type: String,
      default: null,
    },
    titleHead: {
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
  data() {
    return {
      isMobile: false,
    };
  },
  async mounted() {
    this.$nextTick(function () {
      this.nextPath();
    });
  },
  computed: {
    ...mapState("global", ["oldPath", "nowPath"]),
    ...mapFields("global", {
      ready: "ready",
    }),
    isGoHome() {
      return this.goHome;
    },
    titleSeo() {
      return (
        this.titleHead ||
        this.title ||
        "Shop Mua Bán Nick Ninja School, Ngọc Rồng, Avatar Uy Tín Nhất MXH"
      );
    },
  },
  methods: {
    ...mapActions("global", ["setPath"]),

    nextPath() {
      const path = this.$route.path;
      this.setPath(path);
    },
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
  head() {
    return {
      title: this.titleSeo,
      meta: [
        {
          hid: "description",
          name: "description",
          content:
            this.description ||
            "Hệ thống bán Nick tự động 100%. Giảm 10% tất cả các Nick trên Shop. Shop Mua Bán Nick Ninja School, Ngọc Rồng, Avatar Uy Tín - Giá Rẻ- An Toàn Nhất MXH",
        },
        {
          name: "keywords",
          content:
            this.keywords ||
            "nick ninja, shop nick ninja, mua nick ninja, shop acc ninja, mua acc ninja,  shop nick ninja, mua bán nick ninja, shop nick ninja không chiết khấu, acc ninja, mua ních ninja, bán nick ninja, shop ninja sv4, mua nick ninja trả góp, shop nick ninja giá rẻ, xu5sv, shop nick ninja sv world, ",
        },
        { property: "og:image", content: this.image || "/banner.jfif" },
        {
          property: "og:title",
          content:
            this.titleSeo ||
            "Hệ thống bán Nick tự động 100%. Giảm 10% tất cả các Nick trên Shop. Shop Mua Bán Nick Ninja School, Ngọc Rồng, Avatar Uy Tín - Giá Rẻ- An Toàn Nhất MXH",
        },
        {
          property: "og:description",
          content:
            this.description ||
            "Hệ thống bán Nick tự động 100%. Giảm 10% tất cả các Nick trên Shop. Shop Mua Bán Nick Ninja School, Ngọc Rồng, Avatar Uy Tín - Giá Rẻ- An Toàn Nhất MXH",
        },
      ],
    };
  },
};
</script>
<style lang="scss" scoped>
.title-page {
  padding: 0 30px;
}
</style>