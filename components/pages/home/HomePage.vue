<template>
  <div id="home-page">
    <Loading v-if="loading" />
    <b-row v-else>
      <b-col md="12" :lg="colLeft">
        <div :class="{ 'full-screen': fullScreen, 'page-body': !notBoder }">
          <div :class="{ 'page-info': fullScreen }">
            <div v-if="title" class="title text-center">{{ title }}</div>
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
    headTitle: {
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
    isGoHome() {
      return this.goHome;
    },
    titleSeo() {
      return this.headTitle || this.title || "Shop ";
    },
  },
  methods: {
    ...mapActions("global", ["setPath"]),

    nextPath() {
      const path = this.$route.path;
      this.setPath(path);
    },
    onGoBack() {
      if (this.isGoHome) {
        this.$router.push("/");
      } else if (this.pathGoBack) {
        this.$router.push(this.pathGoBack);
      } else {
        const { from } = this.$route.query;
        if (from) this.$router.push(from);
        else this.$router.go(-1);
      }
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
          hid: this.titleSeo,
          name: this.titleSeo,
          content: this.titleSeo,
        },
      ],
    };
  },
};
</script>