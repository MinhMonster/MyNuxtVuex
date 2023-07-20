<template>
  <client-only>
    <div>
      <div v-b-toggle.sidebar-search class="header-menu">
        <b-button type="submit" class="btn btn-info search-btn text-white">
          <span>Tìm Nick </span>
          <!-- <v-icon>mdi-filter-multiple-outline </v-icon> -->
        </b-button>
      </div>
      <b-sidebar
        v-model="isShow"
        id="sidebar-search"
        class="bg-sidebar"
        right
        shadow
        backdrop
      >
        <FormSearch
          :type="type"
          @close="isShow = false"
          @search="$emit('search')"
        ></FormSearch>
      </b-sidebar>
    </div>
  </client-only>
</template>
<script>
import mixins from "@/mixins/index";
import FormSearch from "@/components/pages/client/game/ninjas/FormSearch";
import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions } = createNamespacedHelpers("home/users");
export default {
  mixins: [mixins],
  components: {
    FormSearch,
  },
  props: {
    type: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      isShow: false,
    };
  },
  computed: {
    ...mapState(["token", "user"]),
  },
  mounted() {},
  methods: {
    ...mapActions(["fetchUser"]),
    openMenu() {
      if (this.token && !this.isShow) {
        this.fetchUser();
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.login-btn span {
  display: inline-block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 15ch;
}
::v-deep {
  .b-sidebar-backdrop {
    top: 50px;
  }
  .b-sidebar {
    width: 250px;
  }
  .b-sidebar > .b-sidebar-header {
    padding: 0;

    display: block;
  }

  .close {
    display: block;
    color: red !important;
    // margin-top: 5px;
    margin-right: 5px;
    align-items: center !important;
    justify-content: center !important;
    -ms-flex-pack: center !important;
    text-decoration: none;
    border-radius: 50%;
    font-size: 16px;
    height: 25px;
    width: 25px;
    right: 5px;
    top: 5px;
    font-weight: 800;
    position: absolute;
    z-index: 2;
    opacity: 1;
  }
  .close {
    // background-image: linear-gradient(180deg, #fdffdb, #ffcf9c);
    border: 2px solid #561d00;
  }
  .bg-sidebar {
    z-index: 999;

    .b-sidebar {
      top: 50px;
      color: #fff !important;
      background: radial-gradient(
        circle at 50% 100%,
        #e28637,
        #9f5424 58%,
        #561d00 127%
      );
      height: calc(100vh - 50px);
    }
  }
}
</style>