<template>
  <div>
    <nuxt-child v-if="deverloper" :deverloper="deverloper" :deverlopers="deverlopers" :deverloper_view="deverloper_view" />
  </div>
</template>
<script>
import { mapFields } from "vuex-map-fields";

import { mapActions, mapState } from 'vuex'

export default {
  // components: { TopicForm },
  layout: "adminDeverlopers",
  head() {
    return {
      title: this.titel,
      meta: [
        {
          hid: this.titel,
          name: this.titel,
          content: this.titel,
        },
      ],
    };
  },
  name: "NewTopic",
  data() {
    return {
      titel: "Admin: Edit Topic - " + this.$route.params.id,
      // topic: {
      //   title: "",
      //   link: "",
      //   content: "",
      // },
    };
  },

  async fetch() { 
    // await this.get_deverloper(this.routeId)
  // // },
  // // async fetch() { 
    // await this.get_deverlopers()
  //   await this.get_deverloper_view(this.routeId)

   },
  computed: {
    ...mapFields('admin/deverlopers',["deverloper","deverlopers", "deverloper_view"]),
    routeId() {
      return this.$route.params.id;
    },

  },
  methods: {
    ...mapActions('admin/deverlopers',["get_deverloper", "get_deverlopers", "get_deverloper_view"]),
  },
};
</script>
