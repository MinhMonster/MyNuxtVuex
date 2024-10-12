
<template>
  <div>
    <ModalPayload
      ref="modal"
      :title="`${
        isFormLoginRegister == 'login' ? 'ĐĂNG NHẬP' : 'ĐĂNG KÝ'
      } TÀI KHOẢN`"
      size="md"
      hiddenFooter
      @hide="close"
    >
      <template #content>
        <div class="page-body">
          <FormLogin v-if="isFormLoginRegister == 'login'" @close="close" />
          <FormRegister v-else @close="close" />
        </div>
      </template>
    </ModalPayload>
  </div>
</template>

<script>
import { mapFields } from "vuex-map-fields";
import { mapActions, mapState } from "vuex";
import ModalPayload from "@/components/common/ModalPayload";
import FormLogin from "@/components/pages/client/login/FormLogin";
import FormRegister from "@/components/pages/client/login/FormRegister";

export default {
  components: {
    ModalPayload,
    FormLogin,
    FormRegister,
  },
  watch: {
    showLoginRegister: {
      async handler(newValue, oldValue) {
        await this.resetValidationErrors();
        if (this.showLoginRegister) {
          this.show();
        } else {
          this.$refs.modal.dialog = false;
        }
      },
    },
    isFormLoginRegister: {
      async handler(newValue, oldValue) {
        this.resetValidationErrors();
      },
    },
  },
  props: {},
  data() {
    return {
      tab: null,
      isBuy: "wallet",
      isLoading: false,
    };
  },
  computed: {
    ...mapState("home/users", ["token", "user"]),
    ...mapFields("global", {
      showLoginRegister: "showLoginRegister",
      isFormLoginRegister: "isFormLoginRegister",
    }),
  },
  methods: {
    ...mapActions("home/users", ["buyAccount"]),
    ...mapActions("global", ["resetValidationErrors"]),
    show() {
      this.$refs.modal.show();
    },
    close() {
      this.$refs.modal.dialog = false;
      this.showLoginRegister = false;
      this.$emit("hide");
    },
  },
};
</script>

<style lang="scss" scoped>
.theme-dark form.form-login {
  border: none !important;
}
</style>
