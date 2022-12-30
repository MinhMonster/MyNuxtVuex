<template>
  <div>
    <nuxt-child v-if="category" :category="category" />
  </div>
</template>
<script>
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
      category:"okok",
      titel: "Admin: Edit Topic - " ,
      // topic: {
      //   title: "",
      //   link: "",
      //   content: "",
      // },
    };
  },
  async fetch() { 
  
   },
  computed: {
    
  },
  methods: {
  },
};
</script>