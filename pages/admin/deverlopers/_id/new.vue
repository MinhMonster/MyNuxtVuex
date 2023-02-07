<template>
  <client-only>
    <div>
      <v-card-title>Bài viết mới</v-card-title>
      <div id="body-admin">
        <form @submit.prevent="create()">
          <DeverloperForm :deverloper="deverloper_new"></DeverloperForm>
          <br />
          <br />
          <div class="text-right">
            <v-btn type="submit" color="" to="/admin/topics"> Trở Về </v-btn>
            <v-btn type="submit" color="primary"> Thêm mới </v-btn>
          </div>
        </form>
        <div v-if="actions">
          <div v-for="action, index in actions" :key="index">
            <div>{{ action.id }}</div>
            <CodeForm :index="index"></CodeForm>
          </div>
        </div>
        <AddActionBtnGroups></AddActionBtnGroups>
      </div>
    </div>
  </client-only>
</template>

<script>
import { mapFields } from "vuex-map-fields";
import { mapActions, mapState } from "vuex";
import DeverloperForm from "@/components/pages/admin/deverlopers/form/DeverloperForm.vue";
import CodeForm from "@/components/pages/admin/deverlopers/form/CodeForm.vue";

import AddActionBtnGroups from "@/components/pages/admin/deverlopers/AddActionBtnGroups.vue";

export default {
  components: { DeverloperForm, AddActionBtnGroups, CodeForm },
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
      deverloper_new: {
        title: "",
        link: "",
        info: "",
      },
    };
  },

  created() {},
  async mounted() {
    await this.get_deverloper({
      params: {
        id: this.paramId,
      },
    });
  },
  computed: {
    ...mapState("admin/deverlopers", ["deverlopers", "deverloper"]),
    ...mapFields("admin/deverlopers", ["deverlopers", "actions"]),

    paramId() {
      return this.$route.params.id;
    },
  },
  methods: {
    ...mapActions("admin/deverlopers", [
      "get_deverlopers",
      "get_deverloper",
      "new",
    ]),
    async create() {
      const formData = new FormData();
      formData.append("id", this.paramId);
      formData.append("title", this.deverloper_new.title);
      formData.append("link", this.deverloper_new.link);
      formData.append("info", this.deverloper_new.info);

      const codeValue = JSON.stringify(this.actions);
      formData.append("code", codeValue);

      const input = {
        code: this.actions,
        id: this.paramId,
        title: this.deverloper_new.title,
        link: this.deverloper_new.link,
        info: this.deverloper_new.info,
      }

      // const res = await API.create(formData);
      // this.$swal.fire(res.data.message, "", res.data.status);
      try {
        const res = await this.$repositories.adminDeverlopers.create(formData);
        if (res.data.code === 200) {
          this.$toasted.success(res.data.message);
          this.$router.push(`/admin/deverlopers/${this.deverloper.ID}/show`);
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
