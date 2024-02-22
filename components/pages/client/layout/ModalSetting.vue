<template>
  <div class="sub-menu-buttom" @click="$refs.modal.show()">
    <div class="footer_icon Member">
      <v-btn
        icon
        class="icon-menu"
        id="btn-settings"
        title="Cài Đặt"
        aria-label="Cài Đặt"
      >
        <BaseSvg name="setting" />
      </v-btn>
    </div>
    <span class="title-menu-buttom">Cài Đặt</span>
    <ModalPayload ref="modal" :title="`Cài Đặt`" size="md" hiddenFooter>
      <template #content>
        <div class="base-dialog page-body">
          <div class="base-dialog-bg scroll-y">
            <ul class="base-dialog-list">
              <li class="base-dialog-item list-item-hot on">
                <span class="base-dialog-name text-main bold d-flex">
                  <span class="mr-1"> <BaseSvg name="bell-ring" /> </span>Thông
                  báo
                  <span v-if="!isNotification" class="text-14-400"
                    >(Đã tắt trong 2 giờ)</span
                  ></span
                ><i class="menu-active"></i>

                <v-switch
                  :value="isNotification"
                  color="main"
                  hide-details
                  @click="setNotification(!isNotification)"
                ></v-switch>
              </li>
              <li class="base-dialog-item list-item-hot on">
                <span class="base-dialog-name text-main bold d-flex">
                  <span class="mr-1">
                    <BaseSvg name="theme-light-dark" />
                  </span>
                  Giao Diện Tối </span
                ><i class="menu-active"></i>

                <v-switch
                  v-model="isThemeDark"
                  color="main"
                  hide-details
                ></v-switch>
              </li>
            </ul>
          </div>
        </div>
      </template>
    </ModalPayload>
  </div>
</template>
<script>
import { mapFields } from "vuex-map-fields";
import { mapActions } from "vuex";

import ModalPayload from "@/components/common/ModalPayload";

export default {
  components: {
    ModalPayload,
  },
  computed: {
    ...mapFields("global", {
      isNotification: "isNotification",
      isThemeDark: "isThemeDark",
    }),
  },
  methods: {
    ...mapActions("global", ["setNotification"]),
  },
};
</script>
<style lang="scss" scoped>
.v-application {
  .v-input--selection-controls {
    margin-top: 0px;
    ::v-deep {
      label {
        margin-bottom: 0px !important;
      }
      .main--text {
        color: #9f5424 !important;
        caret-color: #9f5424 !important;
      }
    }
    &.main--text {
      color: #561d00;
    }
  }
}
</style>