<template>
  <div>
    <nuxt-child v-if="topic" :topic="topic" />
  </div>
</template>
<script>
import API from "@/apis/modules/admin/topics";

export default {
  // components: { TopicForm },
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
  data() {
    return {
      titel: "Admin: Edit Topic - " + this.$route.params.id,
      topic: {
        title: "",
        link: "",
        content: "",
      },
    };
  },
  async asyncData({ params }) {
        // const { data } = await axios.get(`https://my-api/posts/${params.id}`)
        // return { title: data.title }
        const res  = await API.showEdit({
        params: {
          id: params.id,
        },
      });
      console.log(`rres`,res.data.topic)
      return {topic: res.data.topic }
  },
  created() {
    // this.show(this.$route.params.id);
  },
  methods: {
    async show(ID) {
      const res = await API.showEdit({
        params: {
          id: ID,
        },
      });
      this.topic = res.data.topic;
    },
  },
};
</script>
