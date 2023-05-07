<template>
  <div>
    <div v-b-toggle.sidebar-right class="header-menu">
      <v-btn icon class="icon-menu">
        <v-icon>mdi-menu</v-icon>
      </v-btn>
    </div>
    <b-sidebar id="sidebar-right" class="bg-sidebar" right shadow>
      <SideBarMenu></SideBarMenu>
    </b-sidebar>
  </div>
</template>
<script>
import mixins from "@/mixins/index";
import SideBarMenu from "@/components/pages/client/layout/SideBarMenu";

export default {
  mixins: [mixins],
  components: {
    SideBarMenu,
  },
  props: {},
  computed: {},
  methods: {},
};
</script>
<style lang="scss" scoped>
::v-deep {
  .b-sidebar {
    width: 250px;
    transition: width 0.5s;

  }
  .b-sidebar > .b-sidebar-header {
    padding: 0;

    display: block;
  }
  .close {
    color: #663019 !important;
    // margin-top: 5px;
    margin-right: 5px;
    align-items: center !important;
    justify-content: center !important;
    -ms-flex-pack: center !important;
    text-decoration: none;
    border-radius: 50%;
    font-size: 16px;
    height: 30px;
    width: 30px;
    right: 5px;
    top: 5px;
    font-weight: 800;
    position: absolute;
    z-index: 2;
  }
  .close {
    background-image: linear-gradient(180deg, #fdffdb, #ffcf9c);
    border: 2px solid #561d00;
  }
  .bg-sidebar .b-sidebar {
    color: #fff !important;
    background: radial-gradient(
      circle at 50% 100%,
      #e28637,
      #9f5424 58%,
      #561d00 127%
    );
  }
}
</style>