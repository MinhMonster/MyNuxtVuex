<template>
  <div id="admin-page">
    <Loading v-if="loading" />
    <b-row v-else>
      <b-col md="12" :lg="colLeft">
        <div :class="{ 'full-screen': fullScreen, 'admin-body': !notBoder }">
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
            <div class="group-left">
              <div v-if="goBack" class="back-page" @click="onGoBack()">
                <v-btn v-if="!isGoHome" icon>
                  <v-icon>mdi-arrow-left-bold-circle-outline</v-icon>
                </v-btn>
                <v-btn v-else icon>
                  <v-icon>mdi-home</v-icon>
                </v-btn>
              </div>
              <div v-if="nextPage" class="next-page" @click="onNextPage()">
                <v-btn icon>
                  <v-icon>mdi-arrow-right-bold-circle-outline</v-icon>
                </v-btn>
              </div>
            </div>

            <div class="group-right">
              
              <div v-if="filter" class="reload-page" @click="onFilter()">
                <v-btn icon>
                  <v-icon>mdi-filter</v-icon>
                </v-btn>
              </div>
              <div v-if="btnEdit" class="reload-page" @click="onEdit()">
                <v-btn icon>
                  <v-icon>mdi-pen</v-icon>
                </v-btn>
              </div>
              <div v-if="newPage" class="new-page" @click="onNewPage()">
                <v-btn icon>
                  <v-icon>mdi-plus</v-icon>
                </v-btn>
              </div>
              <div v-if="reload" class="reload-page" @click="onReload()">
                <v-btn icon>
                  <v-icon>mdi-reload</v-icon>
                </v-btn>
              </div>
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
    nextPage: Boolean,
    goHome: Boolean,
    filter: Boolean,
    reload: Boolean,
    newPage: Boolean,
    btnEdit:  Boolean,
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
      showFilter: "showFilter",
    }),
    isGoHome() {
      return this.goHome;
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

    async onNextPage() {
      const { from } = this.$route.query;
      if (from) this.$router.push(from);
      else await this.$router.go(+1);

      setTimeout(() => {
        this.onReload();
      }, 50);
    },
    onReload() {
      this.ready = false;
      this.$emit("reload");
      setTimeout(() => {
        this.ready = true;
      }, 50);
    },
    onNewPage() {
      this.$emit("newPage");
    },
    onFilter() {
      this.isFilter = !this.isFilter;
      this.$emit("filter");
    },
    onEdit() {
      this.$emit("edit");
    },
  },
};
</script>
<style lang="scss" scoped>
.title-page {
  padding: 0 30px;
}
#admin-page {
  .admin-body {
    position: relative;
    color: #ffffff;
    border: 1px solid #a4a4a4;
    background: #ffffff;
    padding: 6px;
    border-radius: 4px;
    .title-page {
      color: #555;
    }
    .group-left {
      position: absolute;
      left: 7.5px;
      top: 7.5px;
      display: flex;
      gap: 5px;
    }
    .group-right {
      position: absolute;
      right: 7.5px;
      top: 7.5px;
      display: flex;
      gap: 5px;
    }
    .next-page,
    .back-page,
    .reload-page,
    .new-page {
      height: 24px;
      width: 24px;
      background: radial-gradient(
        circle at 50% 100%,
        #a4a4a4,
        #333333 58%,
        #121212 127%
      );
      border-radius: 50%;
    }
    .v-btn--icon.v-size--default .v-icon {
      font-size: 18px !important;
    }
    .theme--dark.v-btn.v-btn--icon {
      height: 24px;
      width: 24px;
    }
  }
}
</style>