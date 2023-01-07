<template>
  <client-only>
    <div>
      <v-card-title>Bài viết mới</v-card-title>
      <div id="body-admin">
        <form @submit.prevent="edit()">
          <DeverloperForm :deverloper="deverloper_item"></DeverloperForm>
          <div class="text-right">
            <br/>
            <v-btn type="submit" color="" to="/admin/deverlopers"> Trở Về </v-btn>
            <v-btn type="submit" color="primary"> Sửa </v-btn>
          </div>
        </form>
      </div>
    </div>
  </client-only>
</template>

<script>
import API from "@/apis/modules/admin/topics";
import api_file from "@/apis/modules/admin/files";
import { mapActions, mapState } from 'vuex'
import DeverloperForm from "@/components/pages/admin/deverlopers/form/DeverloperForm.vue";
import { mapFields } from "vuex-map-fields";
import { cloneDeep } from "lodash";


export default {
  components: { DeverloperForm },
  layout: "adminDev",
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
  name: "EditDeverloper",
  props: {
  },
  data() {
    return {
      ID: "",
      titel: "Admin: Edit Deverloper - ",
    };
  },
  async mounted() {
    await this.get_deverloper_edit({
      params:{
      // input:{
        id: this.routeId,
        // type: this.queryType,
      // }
      }
    });
  },
  computed: {
    ...mapFields('admin/deverlopers',["deverloper","deverloper_edit"]),
    // ...mapState('admin/deverlopers',["deverloper","deverloper_view"]),
    routeId() {
      return this.$route.params.id;
    },
    // queryType() {
    //   return this.$route.query.type;
    // },
    deverloper_item(){
      return cloneDeep(this.deverloper_edit);
    }
  },
  methods: {
    ...mapActions('admin/deverlopers',["get_deverloper_edit"]),
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
      formData.append("id", this.deverloper_item.ID);
      formData.append("title", this.deverloper_item.title);
      formData.append("link", this.deverloper_item.link);
      formData.append("info", this.deverloper_item.info);
      try{
        const res = await this.$repositories.adminDeverlopers.edit(formData)
        if(res.data.code === 200){
          this.$toasted.success(res.data.message);
          // this.$router.push(`/admin/deverlopers/${this.paramId}/show`)
        }
      } catch(e) {
        console.log(e)
      }
      // this.$swal.fire(res.data.message, "", res.data.status);
      // this.$emit("reset");
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
