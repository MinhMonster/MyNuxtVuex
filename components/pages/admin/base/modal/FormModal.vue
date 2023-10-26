<template>
  <v-dialog v-model="dialog" scrollable max-width="300px" light>
    <v-card v-if="stateQuery">
      <v-card-title class="title-modal"> {{ title }}</v-card-title>
      <v-card-text
        :style="{ 'min-height': minHeight, 'max-height': maxHeight }"
      >
        <div class="modal-body">
          <form @submit.prevent="onUpdate()">
            <BaseGroupForm
              :data-form="dataForm"
              :forms="stateForms"
              @updated="updateForm()"
            />
            <v-btn
              v-show="false"
              type="submit"
              color="primary"
              class="text-white"
            >
            </v-btn>
          </form>
        </div>
      </v-card-text>
      <v-card-actions class="text-right right gap-10">
        <v-btn color="red" class="text-white" @click="dialog = false">
          Close
        </v-btn>
        <v-btn
          type="submit"
          color="primary"
          class="text-white"
          @click="onUpdate()"
        >
          Update
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import BaseGroupForm from "@/components/pages/admin/base/BaseGroupForm.vue";
import { mapState } from "vuex";

export default {
  components: { BaseGroupForm },
  props: {
    title: {
      type: String,
      default: "Title",
      require: false,
    },
    id: {
      type: [String, Number],
      defualt: null,
      require: false,
    },
    store: {
      type: Object,
      default: () => {
        return {};
      },
      required: true,
    },
    module: {
      type: String,
      default: "",
      require: true,
    },
    repository: {
      type: String,
      default: "",
      require: false,
    },
    minHeight: {
      type: String,
      default: "300px",
      require: false,
    },
    maxHeight: {
      type: String,
      default: "500px",
      require: false,
    },
  },
  data() {
    return {
      dialog: false,
      cash: 0,
    };
  },
  computed: {
    ...mapState({
      stateQuery(state) {
        return _.get(state, this.store.module + "." + this.store.state, {});
      },
      stateForms(state) {
        return _.get(state, this.store.module + "." + this.store.form, []);
      },
      haveStore() {
        return !_.isEmpty(this.store);
      },
    }),
    dataForm() {
      return _.cloneDeep(this.stateQuery);
    },
  },
  methods: {
    updateForm() {
      this.updateState(this.dataForm);
    },
    resetForm() {
      this.$store.dispatch(this.module + "/resetData", this.store.state);
    },
    updateState(data) {
      this.$store.dispatch(this.module + "/setState", {
        stateName: this.store.state,
        data: data,
      });
    },
    // async showModal(row) {
    //   this.dialog = true;
    //   if (this.haveStore && this.store.action && row.ID) {
    //     await this.fetchData();
    //   }
    // },
    // async fetchData() {
    //   console.log("okok");
    //   try {
    //     const result = await this.$repositories[this.repository][
    //       this.store.action
    //     ](this.id);

    //     const data = result.data.response;
    //     console.log("response", data);

    //     if (data) {
    //       this.updateState(data);
    //     } else {
    //       this.dialog = false;
    //     }
    //   } catch (error) {}
    // },
    async onUpdate() {
      try {
        const result = await this.$repositories[this.repository][
          this.store.update
        ]({
          id: this.id,
          input: this.stateQuery,
        });
        const data = result.data;
        if (data.code === 200) {
          this.$toasted.success(data.message);
          this.$emit("updated");

          // if (this.id !== data.response.ID) {
          //   this.$router.push(this.path.replace(this.id, data.response.ID));
          // }
          if (data.response) {
            this.updateState(data.response);
          }
        }
      } catch (error) {}
    },
  },
};
</script>
<style lang="scss" scoped>
form {
  padding: 0px;
  background: #ffffff;
}
::v-deep {
  .form-group {
    margin-bottom: 0 !important;
  }
}

.v-card.v-sheet.theme--dark {
  border: 1px solid #a4a4a4;
  /* border: 1px solid rgba(255, 255, 255, 0.12); */
}

/* .v-card.v-sheet.theme--dark {
  background: #fff !important;
} */
.v-card__title.title-modal {
  color: #fff;
  border-left: 2px solid #272727;
  border-right: 2px solid #272727;
  background: #333;
  border-bottom: none;
  display: flex;
  justify-content: center;
  align-items: center;
}
.v-dialog--scrollable > .v-card > .v-card__text {
  position: relative;
  border: 2px solid #272727;
  background: #f2f2f2;
  padding: 10px;
  .modal-body {
    background: #fff;
    height: auto;
    min-height: 100%;
    padding: 5px 1rem;
  }
}
.v-dialog > .v-card > .v-card__actions {
  border: 2px solid #272727;
  background: #333;
  border-top: none;
  display: flex;
  flex-direction: row;
  justify-content: right;
  justify-content: end;
  align-content: flex-end;
}
</style>