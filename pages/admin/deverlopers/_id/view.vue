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
          <!-- <h1>{{deverloper_view.title}}</h1> -->
          <v-card-text v-html="deverloper_view.info" class="bg-view view_html"></v-card-text>
        </div>
      </div>
      <!-- <div v-if="is_edit" class="popup">
      <div class="body-popup abs">
        <b @click="closed" class="cancel abs">x</b>
        <edit :IDProps="IDEdit" @reset="getAll"></edit>
      </div>
      <div class="modal-backdrop in"></div>
    </div>
    <div v-if="is_create" class="popup">
      <div class="body-popup abs">
        <b @click="closed" class="cancel abs">x</b>
        <create @reset="getAll"></create>
      </div>
      <div class="modal-backdrop in"></div>
    </div> -->
    </div>
  </client-only>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  layout: "adminDev",
  head() {
    return {
      title: "Admin: Deverlopers",
      meta: [
        {
          hid: "Admin: Deverlopers",
          name: "Admin: Deverlopers",
          content: "Admin: Deverlopers",
        },
      ],
    };
  },
  name: "View_Deverloper",
   async mounted() {
    await this.get_deverloper_view(this.routeId);
  },
  computed: {
    ...mapState('admin/deverlopers',["deverloper","deverloper_view"]),
    routeId() {
      return this.$route.params.id;
    },
  },
  methods: {
    ...mapActions('admin/deverlopers',["get_deverloper_view"]),
  },
};
</script>
<style>
#admin td ul li{
padding: 10px 0;
}
</style>
