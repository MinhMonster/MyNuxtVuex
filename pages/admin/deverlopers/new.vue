<template>
  <client-only>
    <div>
      <v-card-title>Bài viết mới</v-card-title>
      <div id="body-admin">
        <form @submit.prevent="create()">
          <TopicForm :topic="topic"></TopicForm>
          <v-row>
            <v-col cols="12" sm="12" md="12">
              <VueEditor
                id="editor"
                useCustomImageHandler
                v-model="topic.content"
                @image-added="handleImageAdded"
              />
            </v-col>
          </v-row>
          <div class="text-right">
            <v-btn type="submit" color="" to="/admin/topics"> Trở Về </v-btn>
            <v-btn type="submit" color="primary"> Thêm mới </v-btn>
          </div>
        </form>
      </div>
    </div>
  </client-only>
</template>

<script>
import API from "@/apis/modules/admin/topics";
import api_file from "@/apis/modules/admin/files";
import TopicForm from "@/components/pages/admin/topics/form/TopicForm.vue";

export default {
  components: { TopicForm },
  layout: "admin",
  head() {
    return {
      title: "New Topic",
      meta: [
        {
          hid: "New Topic",
          name: "New Topic",
          content: "New Topic",
        },
      ],
    };
  },
  name: "NewTopic",
  data() {
    return {
      input: {},
      topic: {
        title: "",
        link: "",
        content: "",
      },
    };
  },
  
  created() {},
  methods: {
    async create() {
      const formData = new FormData();
      formData.append("title", this.topic.title);
      formData.append("link", this.topic.link);
      formData.append("content", this.topic.content);
      const res = await API.create(formData);
      this.$swal.fire(res.data.message, "", res.data.status);
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
