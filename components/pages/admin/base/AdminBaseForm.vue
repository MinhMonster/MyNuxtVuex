<template>
  <client-only v-if="dataForm">
    <form @submit.prevent="onUpdate()">
      <b-tabs class="tab-account">
        <b-tab title="Infomations" class="tab-scroll scroll-y">
          <BaseGroupForm
            :data-form="dataForm"
            :forms="stateForms"
            @updated="updateForm()"
          />
        </b-tab>

        <b-tab title="Upload Images" class="tab-scroll scroll-y">
          <b-form-checkbox
            v-if="dataForm.full"
            v-model="dataForm.full"
            name="check-button"
            value="1"
            unchecked-value="0"
            switch
            dark
            @input="updateForm()"
            >Show Full Avatar
          </b-form-checkbox>
          <ImageList
            v-if="multipleImages"
            v-model="dataForm[images]"
            @updated="updateForm"
          />
          <UploadImage
            v-else
            @changeImage="changeImage"
            :images-props="dataForm.image ? [dataForm.image ?? ''] : []"
          />
        </b-tab>
      </b-tabs>
      <div class="d-flex mt-3">
        <v-btn v-if="isDelete" @click="onDelete()" color="red"> Delete</v-btn>
        <v-btn v-if="isUnDelete" @click="unDelete()" color="red">
          Un Delete
        </v-btn>
        <v-spacer />
        <div class="text-right">
          <v-btn type="submit" color="primary"> Submit </v-btn>
        </div>
      </div>
    </form>
  </client-only>
</template>

<script>
import UploadImage from "@/components/pages/admin/topics/form/UploadImage";
import ImageList from "@/components/global/molecules/common/ImageList";
import BaseGroupForm from "@/components/pages/admin/base/BaseGroupForm.vue";
import { mapState } from "vuex";

export default {
  components: {
    BaseGroupForm,
    UploadImage,
    ImageList,
  },
  name: "AdminBaseForm",
  props: {
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
    repositories: {
      type: String,
      default: "",
      require: false,
    },
    images: {
      type: String,
      default: "hinhanh",
      require: false,
    },
    multipleImages: {
      type: Boolean,
      default: () => {
        return true;
      },
    },
  },
  data() {
    return {};
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
    is_create() {
      const path = this.$route.path;
      return path.includes("/new");
    },
    isDelete() {
      const api = _.get(this.store, "delete", null);

      return this.id && this.stateQuery.status === "yes" && api;
    },
    isUnDelete() {
      const api = _.get(this.store, "unDelete", null);
      return this.id && (this.stateQuery.status === "no" || !this.stateQuery.status) && api;
    },
  },
  async mounted() {
    await this.resetForm();
  },
  methods: {
    changeImage(images) {
      this.dataForm.image = images[0] ?? "";
      this.updateForm();
    },
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
    async fetchData() {
      try {

        const repositoryKey = this.repositories ? this.$repositories_mimifood : this.$repositories;
        const result = await repositoryKey[this.repository][
          this.store.action
        ](this.id);

        const data = result.data.response;
        console.log("data", result.data);
        if (data) {
          this.updateState(data);
        } else {
          this.$router.push(this.path.replace(this.id, ""));
        }
      } catch (error) {}
    },
    async updateData() {
      try {
        const repositoryKey = this.repositories ? this.$repositories_mimifood : this.$repositories;
        const result = await repositoryKey[this.repository][
          this.store.update
        ]({
          id: this.id,
          input: this.stateQuery,
        });
        const data = result.data;
        if (data.code === 200) {
          this.$toasted.success(data.message);
          if (this.id !== data.response.ID) {
            this.$router.push(this.path.replace(this.id, data.response.ID));
          }
        }
      } catch (error) {}
    },
    async createData() {
      const payload = _.omit(this.stateQuery, "ID");

      try {
        const repositoryKey = this.repositories ? this.$repositories_mimifood : this.$repositories;
        const result = await repositoryKey[this.repository][
          this.store.create
        ]({
          input: payload,
        });
        const data = result.data;
        if (data.code === 200) {
          this.$toasted.success(data.message);
        }
      } catch (error) {}
    },
    async onUpdate() {
      try {
        if (this.id) {
          this.updateData();
        } else {
          this.createData();
        }
      } catch (e) {
        console.log(e);
      }
    },
    async onDelete() {
      this.$swal
        .fire({
          title: `Delete ID: ${this.id} ?`,
          text: "",
          icon: "question",
          type: "warning",
          showDenyButton: false,
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Accept",
          cancelButtonText: "Cancel",
          timer: 5000,
          // closeOnConfirm: false,
          // closeOnCancel: false
        })
        .then(async (result) => {
          if (result.isConfirmed) {
            try {
              const res = await this.$repositories[this.repository][
                this.store.delete
              ](this.id);
              if (res.data.code === 200) {
                await this.$toasted.success(res.data.message);
                this.fetchData();
              }
            } catch (e) {
              console.log(e);
            }
          }
        });
    },
    async unDelete() {
      this.$swal
        .fire({
          title: `Un Delete ID: ${this.id}?`,
          text: "",
          icon: "question",
          type: "warning",
          showDenyButton: false,
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Accept",
          cancelButtonText: "Cancel",
          timer: 5000,
          // closeOnConfirm: false,
          // closeOnCancel: false
        })
        .then(async (result) => {
          if (result.isConfirmed) {
            try {
              const res = await this.$repositories[this.repository][
                this.store.unDelete
              ](this.id);
              if (res.data.code === 200) {
                await this.$toasted.success(res.data.message);
                this.fetchData();
              }
            } catch (e) {
              console.log(e);
            }
          }
        });
    },
  },
  async created() {
    if (this.haveStore && this.id) {
      await this.fetchData();
    }
  },
};
</script>
<style lang="scss" scoped>
.fileItemWrapper {
  position: relative;
  display: flex;
  flex-flow: column;
  border: 1px solid #eff2f7;
  border-radius: 5px;
  padding: 10px;
  align-items: flex-start;
  height: 100%;

  button {
    position: absolute;
    right: -10px;
    top: -10px;
    width: 20px;
    height: 20px;
    font-size: 10px;
    padding: 1px;
  }
}

.CodeMirror-sizer {
  min-height: 500px;
}

img.image-account {
  height: 100%;
  width: 100%;
}

.tab-scroll {
  height: calc(100vh - 315px);
}

.bg-account {
  margin: 0px;
}
</style>
