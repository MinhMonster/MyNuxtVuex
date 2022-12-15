<template>
  <client-only>
    <EditIDTopic ></EditIDTopic>
  </client-only>
</template>

<script>
import EditIDTopic from "../_id/edit.vue";

export default {
  components: { EditIDTopic },
  layout: "admin",
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
  // data() {
  //   return {
  //     ID:"",
  //     titel: "Admin: Edit Topic - " + this.topic.ID,
  //     topic: {
  //       ID:"",
  //       title: "",
  //       link: "",
  //       content: "",
  //     },
  //   };
  // },

  created() {
  },
  methods: {
  }
};
</script>
