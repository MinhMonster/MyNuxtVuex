<template>
  <v-row justify="center" v-if="isShow">
    <v-card class="modal-folder">
      <v-card-title>{{ folder.folderName }}</v-card-title>
      <v-divider></v-divider>
      <v-card-text
        class="pointer"
        @click="$emit('editNameFolder'), closeModal()"
      >
        <v-icon color="blue">mdi-lead-pencil</v-icon>
        Edit Name
      </v-card-text>
      <v-card-text class="pointer">
        <v-icon color="red">mdi-delete-sweep</v-icon>
        Delete  Folder
      </v-card-text>
      <v-card-text class="pointer">
        <v-icon color="red">mdi-folder-remove</v-icon>
        Reset All File
      </v-card-text>
      <b-button
        variant="danger"
        size="sm"
        class="btn-delete ml-2"
        pill
        @click="closeModal()"
      >
        <i class="mdi mdi-close-thick"></i>
      </b-button>
    </v-card>
    <div class="bg-modal"></div>
  </v-row>
</template>
<script>
export default {
  props: {
    label: {
      type: String,
      default: "Title Modal",
    },
    isShow: {
      type: Boolean,
      default: false,
    },
    folder: {
      type: Object,
      default: {},
    },
  },
  data() {
    return {
      name: "",
    };
  },

  methods: {
    closeModal() {
      this.$emit("closeModal", this.name);
    },
    change() {
      this.$emit("change", this.name);
      this.$emit("closeModal");
    },
  },
};
</script>
<style lang="scss" scoped>
.modal-folder {
  top: 30%;
  /* height: 270px; */
  /* max-height: 270px; */
  min-height: 270px !important;
  width: 300px;
  max-width: calc(100% - 50px);

  position: fixed;
  z-index: 2;
  .v-card__text {
    font-size: 15px;
    font-weight: 600;
    line-height: 30px;
    letter-spacing: 0;
    margin-left: 20px;
    padding: 5px;
  }
}
.bg-modal {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 100%;
  width: 100%;
  z-index: 1;
  background: #000;
  opacity: 0.3;
}
.v-card__title {
  padding: 10px;
  display: flex;
  justify-content: center;
  color: rgba(0, 0, 0, 0.6) !important;
}
.v-divider {
  padding: 0;
  margin: 0;
}
button.btn-delete {
  position: absolute;
  right: -7px;
  top: -33px;
  width: 20px;
  height: 20px;
  font-size: 10px;
  padding: 1px;
  color: #fff;
}
</style>