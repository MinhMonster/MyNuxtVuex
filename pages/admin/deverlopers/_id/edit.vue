<template>
  <client-only>
    <div>
      <v-card-title>Bài viết mới</v-card-title>
      <div id="body-admin">
        <form @submit.prevent="edit()">
          <DeverloperForm
            v-if="deverloper_item"
            :deverloper="deverloper_item"
          ></DeverloperForm>

          <div v-if="actions">
            <div v-for="(action, index) in actions" :key="index">
              <div>{{ action.id }}</div>
              <CodeForm :index="index"></CodeForm>
            </div>
          </div>
          <AddActionBtnGroups></AddActionBtnGroups>
          <br/>
          <v-row align="center">
            <v-col>
              <v-btn @click="onDelete()" color="red"> Xóa</v-btn>
            </v-col>
            <v-spacer />
            <v-col>
              <div class="text-right">
                <v-btn type="submit" color="" to="/admin/deverlopers">
                  Trở Về
                </v-btn>
                <v-btn type="submit" color="primary"> Sửa </v-btn>
              </div>
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
import { mapActions, mapState } from "vuex";
import DeverloperForm from "@/components/pages/admin/deverlopers/form/DeverloperForm.vue";
import CodeForm from "@/components/pages/admin/deverlopers/form/CodeForm.vue";
import AddActionBtnGroups from "@/components/pages/admin/deverlopers/AddActionBtnGroups.vue";

import { mapFields } from "vuex-map-fields";
import { cloneDeep } from "lodash";

export default {
  components: { DeverloperForm, CodeForm, AddActionBtnGroups },
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
  props: {},
  data() {
    return {
      ID: "",
      titel: "Admin: Edit Deverloper - ",
    };
  },
  async mounted() {
    await this.get_deverloper_edit({
      params: {
        // input:{
        id: this.routeId,
        // type: this.queryType,
        // }
      },
    });
  },
  computed: {
    ...mapFields("admin/deverlopers", [
      "deverloper",
      "deverloper_edit",
      "actions",
    ]),

    routeId() {
      return this.$route.params.id;
    },
    // queryType() {
    //   return this.$route.query.type;
    // },
    deverloper_item() {
      if (this.deverloper_edit) {
        return cloneDeep(this.deverloper_edit);
      } else {
        this.$router.push("/admin/deverlopers");
      }
    },
  },
  methods: {
    ...mapActions("admin/deverlopers", ["get_deverloper_edit"]),
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
      formData.append("content", this.deverloper_item.content);
      formData.append("html_code", this.deverloper_item.html_code);
      formData.append("css_code", this.deverloper_item.css_code);
      formData.append("javascript_code", this.deverloper_item.javascript_code);
      
      const codeValue = JSON.stringify(this.actions);
      formData.append("code", codeValue);

      try {
        const res = await this.$repositories.adminDeverlopers.edit(formData);
        if (res.data.code === 200) {
          this.$toasted.success(res.data.message);
        }
      } catch (e) {
        console.log(e);
      }
    },

    async onDelete() {
      this.$swal
        .fire({
          title: `Bạn muốn xóa ID: ${this.routeId} <br/> Title: ${this.deverloper_item.title}?`,
          text: "",
          icon: "question",
          type: "warning",
          showDenyButton: false,
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Xóa",
          cancelButtonText: "Hủy",
          timer: 5000,
          // closeOnConfirm: false,
          // closeOnCancel: false
        })
        .then(async (result) => {
          if (result.isConfirmed) {
            const formData = new FormData();
            formData.append("id", this.routeId);
            try {
              const res = await this.$repositories.adminDeverlopers.delete({
                params: {
                  id: this.routeId,
                },
              });
              if (res.data.code === 200) {
                this.$toasted.success(res.data.message);

                if (this.routeId === this.deverloper.ID) {
                  this.$router.push(`/admin/deverlopers`);
                } else {
                  this.$router.push(
                    `/admin/deverlopers/${this.deverloper.ID}/show`
                  );
                }
              }
            } catch (e) {
              console.log(e);
            }
          }
        });
    },
  },
};
</script>
<style >
.CodeMirror {
  height: 500px;
  resize: horizontal;
}
.CodeMirror-wrap pre {
  word-break: break-word;
}
</style>
