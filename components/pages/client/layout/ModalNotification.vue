<template>
  <div class="sub-menu-buttom" @click="$refs.modal.show()">
    <ModalPayload ref="modal" :title="`Thông Báo`" size="md" @hide="close">
      <template #content>
        <div class="page-body">
          <AdminNotification />
        </div>
      </template>
      <template #footer-button>
        <v-btn
          size="sm"
          color="warning"
          id="btn-close-notification"
          title="Đóng Thông Báo Trong 2 Giờ"
          class="text-black mgr-5px"
          aria-label="Đóng Thông Báo Trong 2 Giờ"
          @click="setNotification(), $refs.modal.close()"
        >
          <span>Đóng 2 giờ</span>
        </v-btn>
      </template>
    </ModalPayload>
  </div>
</template>
<script>
import ModalPayload from "@/components/common/ModalPayload";
import AdminNotification from "@/components/pages/home/AdminNotification";
import { mapFields } from "vuex-map-fields";
import { mapActions } from "vuex";
export default {
  components: {
    ModalPayload,
    AdminNotification,
  },
  computed: {
    ...mapFields("global", {
      isNotification: "isNotification",
    }),
  },
  mounted() {
    // this.show();
  },
  methods: {
    ...mapActions("global", ["setNotification"]),
    show() {
      if (this.isNotification) {
        // this.$refs.modal.show();
      } else {
        this.$emit("hide");
      }
    },
    close() {
      this.$emit("hide");
    },
  },
};
</script>
<style lang="scss" scoped>
::v-deep {
  .v-dialog:not(.v-dialog--fullscreen) {
    // height: auto;
    height: calc(100vh - 200px) !important;
  }
}
</style>
