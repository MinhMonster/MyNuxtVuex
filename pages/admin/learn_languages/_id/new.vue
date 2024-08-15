<template>
  <client-only>
    <div>
      <v-card-title>Bài viết mới</v-card-title>
      <div id="body-admin">
        <form @submit.prevent="create()">
          <FinanceForm :finance="finance_new"></FinanceForm>
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
            <!-- <CodeForm :index="index"></CodeForm> -->
          </div>
        </div>
        <!-- <AddActionBtnGroups></AddActionBtnGroups> -->
      </div>
    </div>
  </client-only>
</template>

<script>
import { mapFields } from "vuex-map-fields";
import { mapActions, mapState } from "vuex";
import FinanceForm from "@/components/pages/admin/finances/form/FinanceForm.vue";
// import CodeForm from "@/components/pages/admin/finances/form/CodeForm.vue";

// import AddActionBtnGroups from "@/components/pages/admin/finances/AddActionBtnGroups.vue";

export default {
  components: {
    FinanceForm,
    // AddActionBtnGroups,
    // CodeForm
  },
  layout: "adminDev",
  head() {
    return {
      title: "New finance",
      meta: [
        {
          hid: "New finance",
          name: "New finance",
          content: "New finance",
        },
      ],
    };
  },
  name: "Newfinance",
  data() {
    return {
      input: {},
      finance_new: {
        title: "",
        link: "",
        info: "",
      },
    };
  },

  created() {},
  async mounted() {
    await this.get_finance({
      params: {
        id: this.paramId,
      },
    });
  },
  computed: {
    ...mapState("admin/finances", ["finances", "finance"]),
    ...mapFields("admin/finances", ["finances", "actions"]),

    paramId() {
      return this.$route.params.id;
    },
  },
  methods: {
    ...mapActions("admin/finances", [
      "get_finances",
      "get_finance",
      "new",
    ]),
    async create() {
      const formData = new FormData();
      formData.append("id", this.paramId);
      formData.append("title", this.finance_new.title);
      formData.append("link", this.finance_new.link);
      formData.append("info", this.finance_new.info);

      const codeValue = JSON.stringify(this.actions);
      formData.append("code", codeValue);

      const input = {
        code: this.actions,
        id: this.paramId,
        title: this.finance_new.title,
        link: this.finance_new.link,
        info: this.finance_new.info,
      }

      // const res = await API.create(formData);
      // this.$swal.fire(res.data.message, "", res.data.status);
      try {
        const res = await this.$repositories.adminFinances.create(formData);
        if (res.data.code === 200) {
          this.$toasted.success(res.data.message);
          this.$router.push(`/admin/finances/${this.finance.ID}/show`);
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
