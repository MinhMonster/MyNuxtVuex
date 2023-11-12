<template>
  <v-row justify="center" v-if="isShow">
    <v-card class="modal-folder">
      <v-card-title>{{ label }}</v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <form ref="form" @submit.stop.prevent="change()">
          <b-form-group
            label-for="name-input"
            invalid-feedback="Name is required"
          >
            <b-form-input
              id="name-input"
              v-model="name"
              required
            ></b-form-input>
          </b-form-group>
        </form>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions class="right">
        <v-btn class="bg-danger text-white" @click="closeModal()">
          Close
        </v-btn>
        <v-btn
          color="blue-darken-1"
          class="bg-primary text-white"
          variant="text"
          @click="change()"
        >
          Save
        </v-btn>
      </v-card-actions>
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
<style scoped>
.modal-folder {
  top: 30%;
  /* height: 270px; */
  /* max-height: 270px; */
  min-height: 270px !important;
  width: 500px;
  max-width: calc(100% - 20px);

  position: fixed;
  z-index: 2;
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
</style>