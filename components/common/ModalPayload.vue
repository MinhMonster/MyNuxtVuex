
<template>
  <v-dialog
    v-if="dialog"
    v-model="dialog"
    :id="`${isDark ? 'theme-dark' : ''}`"
    :title="title"
    scrollable
    :size="size"
    max-width="500px"
    @hide="close()"
    class="modal-content"
  >
    <v-card :max-height="height">
      <BaseSvg class="close" color="red" @click="close()" name="close" />
      <v-card-title class="title-modal text-menu-main">
        {{ title }}
      </v-card-title>
      <v-card-text class="modal-body">
        <div class="base-dialog">
          <div class="base-dialog-bg">
            <slot name="content"></slot>
          </div>
        </div>
      </v-card-text>
      <v-card-actions v-if="!hiddenFooter">
        <div class="text-right right w-100">
          <div class="flex-columns">
            <slot name="footer-content"></slot>
            <div class="flex right gap-5px">
              <div class="text-right right w-100">
                <slot name="footer-button"></slot>
              </div>
              <div class="text-right right w-100">
                <v-btn color="red" class="text-white" @click="dialog = false">
                  {{ textClose }}
                </v-btn>
              </div>
            </div>
          </div>
        </div>
      </v-card-actions>
    </v-card>
    <!-- <template #modal-footer="{ hide }">
      <div class="flex-columns">
        <slot name="footer-content"></slot>
        <div class="flex right gap-5px">
          <slot name="footer-button"></slot>
          <v-btn size="sm" color="danger" @click="hide()">
            {{ textClose }}
          </v-btn>
        </div>
      </div>
    </template> -->
  </v-dialog>
</template>
  
<script>
export default {
  name: "ModalPayload",
  data() {
    return {
      dialog: false,
    };
  },
  props: {
    title: {
      type: String,
      default: "Title",
    },
    textClose: {
      type: String,
      default: "Đóng",
    },
    size: {
      type: String,
      default: "lg",
    },
    height: {
      type: String,
      default: "auto",
    },
    hiddenFooter: Boolean,
  },
  methods: {
    show() {
      this.dialog = true;
      // this.$refs.modal.show();
    },
    close() {
      this.dialog = false;
      // this.$refs.modal.hide();
      this.$emit("hide");
    },
  },
};
</script>
  
  <style lang="scss" scoped>
.title {
  color: #1e5b7e;
  margin-bottom: 10px;
}

::v-deep {
  .modal-header {
    border-left: 2px solid #663019;
    border-right: 2px solid #663019;
    // background: #e28637 url(https://muabannick.pro/images/header/bg_top.png)
    //   repeat-x;
    background-image: linear-gradient(
      180deg,
      #561d00,
      #e28637 9%,
      #e28637 58%,
      #e28637
    );

    border-bottom: none;
    display: flex;
    justify-content: center;
    align-items: center;

    .modal-title {
      font-size: 18px;
      color: #561d00;
      text-transform: uppercase;
    }
    .close {
      display: flex !important;
      color: var(--danger);
      margin-top: -10px;
      margin-right: -10px;
      align-items: center !important;
      justify-content: center !important;
      -ms-flex-pack: center !important;
      text-decoration: none;
      border-radius: 50%;
      height: 25px;
      width: 25px;
      line-height: 25px;
      right: 3px;
      top: 3px;
      position: absolute;
      background: #ffcf9c;
      border: 2px solid #561d00;
      z-index: 2;
      opacity: 1 !important;
      font-size: 23px;
      padding: 0px;
      margin: -11px -11px -11px auto;
    }
  }

  .modal-dialog-scrollable .modal-content {
    overflow: visible;
  }
  .modal-body {
    position: relative;
    border: 2px solid #561d00;
    background: #ffcf9c;
    padding: 10px;
    .modal-info {
      border-radius: 4px;
      position: relative;
      padding: 5px;
      color: #663019;
      // border: 1px solid #663019;
      // background: #ffefa3;
    }
  }
  .modal-footer {
    border: 2px solid #663019;
    background: #e28637;
    border-top: none;
  }
}
</style>
