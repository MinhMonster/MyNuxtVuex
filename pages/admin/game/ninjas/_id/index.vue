<template>
  <NavAdmin
    title="New Account Ninja School"
    goBack
    next-page
    new-page
    @newPage="$router.push('/admin/game/ninjas/new')"
    reload
    @reload="fetchAccount()"
  >
    <template #body>
      <div id="body-admin" class="mt-2">
        <form @submit.prevent="edit()"> 
          <NinjaForm></NinjaForm>
          <br />
          <div class="d-flex">
            <v-btn v-if="ninja && status== 'yes'" @click="onDelete()" color="red"> Xóa</v-btn>
            <v-btn v-if="ninja && status== 'no'" @click="unDelete()" color="red">Đăng</v-btn>
            <v-spacer />
            <div class="text-right">
              <v-btn type="submit" color="" to="/admin/game/ninjas">
                Trở Về
              </v-btn>
              <v-btn type="submit" color="primary"> Sửa </v-btn>
            </div>
          </div>
        </form>
      </div>
    </template>
  </NavAdmin>
</template>

<script>
import API from "@/apis/modules/admin/topics";
import { mapActions } from "vuex";
import NinjaForm from "@/components/pages/admin/game/ninjas/form/NinjaForm.vue";
import { mapFields } from "vuex-map-fields";
import { cloneDeep } from "lodash";
import mixins from "@/mixins/index";
import NavAdmin from "@/components/pages/admin/layout/NavAdmin";

export default {
  mixins: [mixins],
  components: {
    NinjaForm,
    NavAdmin,
  },
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
  name: "EditAccountNinja",
  props: {},
  data() {
    return {
      ID: "",
      titel: `Admin: Edit Account Ninja -  ${this.accountId}`,
    };
  },
  mounted() {
    this.fetchAccount();
  },
  computed: {
    ...mapFields("admin/game/ninjas", {
      ninja: "ninja",
      status: "ninja.status",
    }),
    accountId() {
      return this.$route.params.id;
    },
  },
  methods: {
    ...mapActions("admin/game/ninjas", [
      "fetchAccountNinja",
      "updateAccountNinja",
    ]),
    async show(ID) {
      const res = await API.showEdit({
        params: {
          id: ID,
        },
      });
      this.topic = res.data.topic;
    },
    fetchAccount() {
      this.fetchAccountNinja({
        params: {
          id: this.accountId,
        },
      });
    },
    async edit() {
      try {
        const res = await this.updateAccountNinja(this.accountId);
        if (res.data.code === 200) {
          this.$toasted.success(res.data.message);
          if (
            res.data.accountNinja.ID &&
            this.accountId != res.data.accountNinja.ID
          ) {
            this.$router.push(`/admin/game/ninjas/${res.data.accountNinja.ID}`);
          }
        }
      } catch (e) {
        console.log(e);
      }
    },

    async onDelete() {
      this.$swal
        .fire({
          title: `Bạn muốn xóa ID: ${this.accountId} ?`,
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
            try {
              const res =
                await this.$repositories.adminGameNinjas.destroyAccountNinja({
                  params: {
                    id: this.accountId,
                  },
                });
              if (res.data.code === 200) {
                this.$toasted.success(res.data.message);
                this.fetchAccount()
              }
            } catch (e) {
              console.log(e);
            }
          }
        });
    },
    async unDelete() {
      this.$swal
        .fire({
          title: `Bạn muốn Đăng bán ID: ${this.accountId}?`,
          text: "",
          icon: "question",
          type: "warning",
          showDenyButton: false,
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Xác nhận",
          cancelButtonText: "Hủy",
          timer: 5000,
          // closeOnConfirm: false,
          // closeOnCancel: false
        })
        .then(async (result) => {
          if (result.isConfirmed) {
            try {
              const res =
                await this.$repositories.adminGameNinjas.unDestroyAccountNinja({
                  params: {
                    id: this.accountId,
                  },
                });
              if (res.data.code === 200) {
                this.$toasted.success(res.data.message);
                this.fetchAccount()
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
  height: 300px;
  resize: horizontal;
}
.CodeMirror-wrap pre {
  word-break: break-word;
}
</style>
