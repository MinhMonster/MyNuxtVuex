<template>
  <v-row justify="center" v-if="isShow">
    <v-card class="modal-folder">
      <v-card-title class="title-modal">
        {{ folder ? "Update Name: " + folder.name : "Create Folder" }}
      </v-card-title>
      <v-card-text>
        <div class="modal-body pd-15px">
          <form ref="form" @submit.stop.prevent="change()">
            <b-form-group
              label-for="name-input"
              invalid-feedback="Name is required"
            >
              <form-validator name="id"></form-validator>
              <form-validator name="name">
                <b-form-input id="name-input" v-model="name" required>
                </b-form-input>
              </form-validator>
            </b-form-group>
          </form>
        </div>
      </v-card-text>
      <v-card-actions class="right">
        <v-btn class="bg-danger text-white" @click="closeModal()">
          Close
        </v-btn>
        <v-btn
          color="blue-darken-1"
          class="bg-primary text-white"
          variant="text"
          :disabled="!name || (folder && folder.name == name)"
          @click="change()"
        >
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
    <div class="bg-modal-folder"></div>
  </v-row>
</template>
<script>
import FormValidator from "@/components/pages/admin/Shared/form/FormValidator";

export default {
  components: {
    FormValidator,
  },
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
      default: () => {},
    },
  },
  data() {
    return {
      name: "",
    };
  },
  mounted() {
    this.name = _.cloneDeep(this.folder ? this.folder.name : "");
  },
  methods: {
    closeModal() {
      this.$emit("closeModal", this.name);
    },
    change() {
      this.$emit("change", this.name);
      // this.$emit("closeModal");
    },
  },
};
</script>
<style scoped>
</style>
