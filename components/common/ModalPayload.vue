
<template>
  <b-modal ref="modal" :title="title" scrollable size="lg" @hide="close()">
    <div class="modal-info">
      <slot name="content"></slot>
    </div>
    <template #modal-footer="{ hide }">
      <div class="flex-columns">
        <slot name="footer-content"></slot>
        <div class="flex right gap-5px">
          <slot name="footer-button"></slot>
          <b-button size="sm" variant="danger" @click="hide()">
            {{ textClose }}
          </b-button>
        </div>
      </div>
    </template>
  </b-modal>
</template>
  
<script>
export default {
  name: "ModalPayload",

  props: {
    title: {
      type: String,
      default: "Title",
    },
    textClose: {
      type: String,
      default: "Đóng",
    },
  },
  async mounted() {
    this.$refs.modal.show();
  },
  computed: {},
  methods: {
    close() {
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
    background: #e28637 url(https://muabannick.pro/images/header/bg_top.png)
      repeat-x;
    border-bottom: none;
    display: flex;
    justify-content: center;
    align-items: center;

    .modal-title {
      color: #561d00;
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
      height: 20px;
      width: 20px;
      line-height: 20px;
      right: 0;
      top: 0;
      position: absolute;
      background: #ffcf9c;
      border: 2px solid #561d00;
      z-index: 2;
      opacity: 1 !important;
      padding: 10px;
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
