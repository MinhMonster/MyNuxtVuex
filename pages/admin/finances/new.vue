<template>
  <client-only>
    <div>
      <v-row align="center">
        <v-col>
          <v-card-title>finance</v-card-title>
        </v-col>
        <v-spacer />
        <v-col>
          <v-card-title class="right" >Bài viết mới</v-card-title>
        </v-col>
      </v-row>
      <div id="body-admin">
        <form @submit.prevent="create()">
          <FinanceForm :finance="finance"></FinanceForm>
          <br/>
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
import { mapActions } from 'vuex'
import FinanceForm from "@/components/pages/admin/finances/form/FinanceForm.vue";

export default {
  components: { FinanceForm },
  layout: "adminDev",
  head() {
    return {
      title: "New Finance",
      meta: [
        {
          hid: "New finance",
          name: "New finance",
          content: "New finance",
        },
      ],
    };
  },
  name: "NewFinance",
  data() {
    return {
      input: {},
      finance: {
        title: "",
        link: "",
        info: "",
      },
    };
  },
  
  created() {},
  methods: {
    ...mapActions('admin/finances',["get_finances", "new"]),
    async create() {
      const formData = new FormData();
      formData.append("title", this.finance.title);
      formData.append("link", this.finance.link);
      formData.append("info", this.finance.info);
      // const res = await API.create(formData);
      // this.$swal.fire(res.data.message, "", res.data.status);
      try{
        const res = await this.$repositories.adminFinances.create(formData)
        if(res.data.code === 200){
          this.$toasted.success(res.data.message);
          this.$router.push("/admin/finances")
        }
      } catch(e) {
        console.log(e)
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
