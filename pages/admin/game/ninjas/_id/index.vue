<template>
  <client-only>
    <div>
      <div id="body-admin">
        <form @submit.prevent="edit()">
          <NinjaForm></NinjaForm>
          <br />
          <div class="d-flex">
            <v-btn @click="onDelete()" color="red"> Xóa</v-btn>
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
    </div>
  </client-only>
</template>

<script>
import API from "@/apis/modules/admin/topics";
import { mapActions } from "vuex";
import NinjaForm from "@/components/pages/admin/game/ninjas/form/NinjaForm.vue";
import { mapFields } from "vuex-map-fields";
import { cloneDeep } from "lodash";
import mixins from "@/mixins/index";

export default {
  mixins: [mixins],
  components: {
    NinjaForm,
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
  async mounted() {
    await this.fetchAccountNinja({
      params: {
        id: this.accountId,
      },
    });
  },
  computed: {
    accountId() {
      return this.$route.params.id;
    },
    finance_item() {
      if (this.finance_edit) {
        return cloneDeep(this.finance_edit);
      } else {
        this.$router.push("/admin/finances");
      }
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
    async edit() {
      try {
        const res = await this.updateAccountNinja(this.accountId);
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
                this.$router.push(`/admin/game/ninjas`);
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
