<template>
  <client-only>
    <div>
      <v-row align="center">
        <v-col>
          <v-card-title>Deverloper</v-card-title>
        </v-col>
        <v-spacer />
        <v-col>
          <v-card-title class="right">Bài viết mới</v-card-title>
        </v-col>
      </v-row>
      <div id="body-admin">
        <form @submit.prevent="create()">
          <DeverloperForm :deverloper="deverloper"></DeverloperForm>
          <br />
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
import { mapActions } from "vuex";
import DeverloperForm from "@/components/pages/admin/deverlopers/form/DeverloperForm.vue";

export default {
  components: { DeverloperForm },
  layout: "adminDev",
  head() {
    return {
      title: "New Deverloper",
      meta: [
        {
          hid: "New Deverloper",
          name: "New Deverloper",
          content: "New Deverloper",
        },
      ],
    };
  },
  name: "NewDeverloper",
  data() {
    return {
      input: {},
      deverloper: {
        title: "",
        link: "",
        info: "",
      },
    };
  },

  created() {
    this.setNew();
  },
  methods: {
    ...mapActions("admin/deverlopers", ["setNew"]),
    async create() {
      const formData = new FormData();
      formData.append("title", this.deverloper.title);
      formData.append("link", this.deverloper.link);
      formData.append("info", this.deverloper.info);
      // const res = await API.create(formData);
      // this.$swal.fire(res.data.message, "", res.data.status);
      try {
        const res = await this.$repositories.adminDeverlopers.create(formData);
        if (res.data.code === 200) {
          this.$toasted.success(res.data.message);
          this.$router.push("/admin/deverlopers");
        }
      } catch (e) {
        console.log(e);
      }
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
