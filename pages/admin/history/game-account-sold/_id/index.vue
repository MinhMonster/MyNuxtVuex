<template>
  <NavAdmin
    title="Game Account Sold"
    goBack
    next-page
    reload
    @reload="fetchAccountSold()"
  >
    <template #body>
      <div v-if="gameAccountSold" id="body-admin" class="mt-2">
        <form @submit.prevent="edit()"> 
          <GameAccountSoldForm></GameAccountSoldForm>
          <br />
          <div class="d-flex">
            <v-spacer />
            <div class="text-right">
              <v-btn type="submit" color="" to="/admin/history/game-account-sold">
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
import GameAccountSoldForm from "@/components/pages/admin/histories/game_account_sold/form/GameAccountSoldForm";

import { mapFields } from "vuex-map-fields";
import mixins from "@/mixins/index";
import NavAdmin from "@/components/pages/admin/layout/NavAdmin";

export default {
  mixins: [mixins],
  components: {
    GameAccountSoldForm,
    NavAdmin,
  },
  layout: "adminDev",
  
  name: "AdminUpdateSoldNinja",
  props: {},
  data() {
    return {
      ID: "",
      titel: `Admin: Edit Account Ninja -  ${this.accountId}`,
    };
  },
  mounted() {
    this.fetchAccountSold();
  },
  computed: {
    ...mapFields("admin/histories/game_account_sold", {
      gameAccountSold: "gameAccountSold",
    }),
    accountId() {
      return this.$route.params.id;
    },
  },
  methods: {
    ...mapActions("admin/histories/game_account_sold", [
      "fetchGameAccountSold",
      "updateGameAccountSold",
    ]),
    async show(ID) {
      const res = await API.showEdit({
        params: {
          id: ID,
        },
      });
      this.topic = res.data.topic;
    },
    fetchAccountSold() {
      this.fetchGameAccountSold({
        params: {
          id: this.accountId,
        },
      });
    },
    async edit() {
      try {
        const res = await this.updateGameAccountSold(this.accountId);
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
                this.fetchGameAccountSold()
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
                this.fetchGameAccountSold()
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
