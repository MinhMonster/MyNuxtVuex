<template>
  <client-only>
    <div class="">
      <v-row align="center">
        <v-col>
          <v-card-title>{{deverloper_view.title}}</v-card-title>
        </v-col>
        <!-- <v-spacer /> -->
        <!-- <v-col
          ><v-btn class="right mgr-15px" color="primary" :to="`/admin/deverlopers/${deverloper_view.level_1}/show`"
            >Quay lại
          </v-btn></v-col
        > -->
      </v-row>

      <div id="body-admin" >
        <div v-if="!deverloper_view" class="">
          <div class=""></div>
        </div>
        <div >
          <v-card-text v-html="deverloper_view.info" class="bg-view view_html"></v-card-text>
        </div>
      </div>
    </div>
  </client-only>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  layout: "adminDev",
  head() {
    return {
      title: "Admin: Deverlopers - " + this.paramType + " - " + this.deverloper_view.title,
      meta: [
        {
          hid: "Admin: Deverlopers - " + this.paramType + " - " + this.deverloper_view.title,
          name: "Admin: Deverlopers - " + this.paramType + " - " + this.deverloper_view.title,
          content: "Admin: Deverlopers - " + this.paramType + " - " + this.deverloper_view.title,
        },
      ],
    };
  },
  name: "View_Deverloper",
  async mounted() {

    await this.get_deverloper_view({
        link: this.paramLink,
        type: this.paramType,
    });
  },
  computed: {
    ...mapState('admin/deverlopers',["deverloper","deverloper_view"]),
    paramType() {
      return this.$route.params.type;
    },
    paramLink() {
      return this.$route.params.link;
    },
  },
  methods: {
    ...mapActions('admin/deverlopers',["get_deverloper_view"]),
  },
};
</script>
<style>
</style>
