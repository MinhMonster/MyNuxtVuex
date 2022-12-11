<template>
  <div>
    <nuxt-child v-if="topic" :topic="topic" />
  </div>
</template>
<script>
import API from "@/apis/modules/admin/topics";


export default {
  components: { TopicForm },
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

  created() {
    this.show(this.$route.params.id);
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
    async edit() {
      const formData = new FormData();
      formData.append("id", this.topic.ID);
      formData.append("title", this.topic.title);
      formData.append("link", this.topic.link);
      formData.append("content", this.topic.content);
      const res = await API.edit(formData);
      this.$swal.fire(res.data.message, "", res.data.status);
      this.$emit("reset");
    },

    async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
      const formData = new FormData();
      formData.append("file", file);
      const input = {
        file: formData,
      };
      const res = await api_file.upload(input);
      const url = res.data.file;
      Editor.insertEmbed(cursorLocation, "image", url);
      resetUploader();
    },
  },
};
</script>

