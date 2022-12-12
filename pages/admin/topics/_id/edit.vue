<template>
  <client-only>
    <div>
      <v-card-title>Bài viết mới</v-card-title>
      <div id="body-admin">
        <form @submit.prevent="edit()">
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

          <v-row>
            <v-col class="tex-left">
              <v-btn type="submit" color="error" to="/admin/topics">
                Xóa
              </v-btn>
              <v-spacer />
            </v-col>
            <v-col class="text-right">
              <v-btn
                right
                depressed
                type="submit"
                color="light"
                to="/admin/topics"
              >
                Trở Về
              </v-btn>
              <v-btn right type="submit" color="primary"> Sửa </v-btn>
            </v-col>
          </v-row>
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
      topic: {
        ID:"",
        title: "",
        link: "",
        content: "",
      },
    };
  },

  created() {
    if (this.$route.params.id) {
      this.ID = this.$route.params.id;
    } else {
      this.ID = this.$route.query.id;
    } 
    this.show(this.ID);
    console.log(this.$route);
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
