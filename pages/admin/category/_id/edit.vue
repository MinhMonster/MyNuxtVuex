<template>
  <client-only>
    <div>
      <v-card-title>Bài viết mới</v-card-title>
      <div id="body-admin">
        
      </div>
    </div>
  </client-only>
</template>

<script>

export default {
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
  name: "EditTopic",
  props: {
  },
  data() {
    return {
      ID: "",
      titel: "Admin: Edit Topic - " + [this.$route.query.id || this.$route.params.id],
      category: {
        ID:"",
        title: "",
        link: "",
        content: "",
      },
    };
  },

  created() {
   
  },
  methods: {
    
  },
};
</script>
