<template>
  <v-row justify="center" v-if="isShow">
    <v-card class="modal-folder">
      <v-card-title class="title-modal">{{ folder.name }}</v-card-title>
      <v-card-text>
        <div class="modal-body pd-15px">
          <div class="pointer" @click="$emit('editNameFolder'), closeModal()">
            <v-icon color="blue">mdi-lead-pencil</v-icon>
            Edit Name
          </div>
          <hr />
          <div class="pointer">
            <v-icon color="red">mdi-delete-sweep</v-icon>
            Delete Folder
          </div>
          <hr />
          <div class="pointer">
            <v-icon color="red">mdi-folder-remove</v-icon>
            Reset All File
          </div>
        </div>
      </v-card-text>
      <v-card-actions class="text-right right gap-10">
        <div class="text-right right w-100">
          <v-btn color="red" class="text-white" @click="closeModal()">
            Close
          </v-btn>
        </div>
      </v-card-actions>
    </v-card>
    <div class="bg-modal-folder"></div>
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

.v-card__title {
  padding: 10px;
  display: flex;
  justify-content: center;
  // color: rgba(0, 0, 0, 0.6) !important;
}
.v-divider {
  padding: 0;
  margin: 0;
}
</style>
