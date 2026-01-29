import { mapState } from "vuex";

export default {
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
      default: "repositories",
      require: false,
    },
    images: {
      type: String,
      default: "images",
      require: false,
    },
    multipleImages: {
      type: Boolean,
      default: () => {
        return true;
      },
    },
    columns: {
      type: Array,
      default: () => [],
    },
    isFilterForm: {
      type: Boolean,
      default: () => {
        return false;
      },
    },
  },
  computed: {
    repo() {
      return this.convertToCamelCase(this.module);
    },
    storeModule() {
      return this.convertToDot(this.module);
    },
    storeState() {
      return this.store?.state;
    },
    storeQueryItem() {
      return this.store?.queryItem || 'queryItem';
    },
    storeQueryItems() {
      return this.store?.queryItems || 'queryItems';
    },
    storeFormItem() {
      return this.store?.formItem || 'formItem';
    },
    itemId() {
      return this.id ?? (this.isQueryCopy ? this.$route.query.copy : null);
    },
    ...mapState({
      stateModule(state) {
        return _.get(state, this.storeModule);
      },
      repositoryKey() {
        return this[`$${this.stateModule.repositories || this.repositories}`];
      },
      stateQuery() {
        return this.stateModule[this.storeState] || {};
      },
      stateQueryItem() {
        return this.stateModule[this.storeQueryItem] || {};
      },
      stateForms() {
        return this.stateModule[this.storeFormItem] || [];
      },
      // index
      stateQueryItems() {
        return this.stateModule[this.storeQueryItems] || {};
      },
      stateColumns() {
        return this.stateModule.columns || this.columns;
      },
      stateParamDefault() {
        return this.params.length > 0
          ? this.stateModule.paramDefaults || {}
          : {};
      },
      meta() {
        return this.storeGetter("metaFilter")(this.storeQueryItems);
      },
      dataSource() {
        return this.storeGetter("dataFilter")(this.storeQueryItems);
      },
      count() {
        return this.stateQueryItems?.response?.count || 0;

      },
      sums() {
        return this.stateQueryItems?.response?.sums || [];
      },
      cost_value(state) {
        return _.get(
          state,
          this.stateModule + "." + this.storeQueryItems + ".response.cost_value",
          0
        );

      },
      profit_value(state) {
        return _.get(
          state,
          this.stateModule + "." + this.storeQueryItems + ".response.profit_value",
          0
        );
      },
      haveStore() {
        return !_.isEmpty(this.store);
      },
    }),
    dataForm() {
      if (!this.isFilterForm) {
        return _.cloneDeep(this.stateQueryItem);
      }
      const allowedFields = this.stateForms.map((f) => f.value);
      const data = _.cloneDeep(this.stateQueryItem);
      return Object.fromEntries(
        Object.entries(data).filter(([key]) => key === 'id' || allowedFields.includes(key))
      );
    },
    is_create() {
      const path = this.$route.path;
      return path.includes("/new");
    },
    isDelete() {
      const api = _.get(this.store, "delete", null);

      return this.itemId && this.stateQueryItem.deleted_at === null && api;
    },
    isUnDelete() {
      const api = _.get(this.store, "unDelete", null);
      return this.itemId && this.stateQueryItem.deleted_at !== null && api;
    },
  },
  methods: {
    changeImage(images) {
      this.dataForm.image = images[0] ?? "";
      this.updateForm();
    },
    updateForm() {
      this.updateStateQueryItem(this.dataForm);
    },
    storeDispatch(action, payload) {
      return this.$store.dispatch(`${this.module}/${action}`, payload);
    },
    storeGetter(name) {
      return this.$store.getters[`${this.module}/${name}`];
    },
    resetForm() {
      this.storeDispatch("resetData", this.storeQueryItem);
    },
    resetDataForm() {
      this.storeDispatch("resetDataForm", this.storeQueryItem);
    },
    updateStateQueryItem(data) {
      this.storeDispatch("setState", {
        stateName: this.storeQueryItem,
        data: data,
      });
    },
    async fetchData() {
      try {
        const result = await this.repositoryKey[this.repo][this.store.action || 'fetch'](this.itemId);

        const data = result.data.response;
        if (data) {
          this.updateStateQueryItem(data);
        } else {
          this.$router.push(this.path.replace(this.itemId, ""));
        }
      } catch (error) { }
    },
    async onModify(method = null) {
      const action = this.repositoryKey[this.repo][method || this.store.modify || 'modify'];

      try {
        const isUpdate = this.itemId && !this.isQueryCopy;

        const payload = {
          ...(isUpdate ? { id: this.itemId } : {}),
          input: isUpdate
            ? this.stateQueryItem
            : _.omit(this.stateQueryItem, 'id'),
        };

        await action(payload);

        if (!isUpdate) {
          this.$router.push(this.path.replace('new', ''));
        }
        this.$emit("updated", payload);
      } catch (e) {
        console.error(e);
      }
    },

    async executeAction(method = null) {
      const action = this.repositoryKey[this.repo][method || this.store.modify || 'modify'];
      try {
        await action(this.stateQueryItem);
        this.$emit("updated", this.stateQueryItem);
      } catch (e) {
        console.error(e);
      }
    },

    async onActive(id) {
      const action = this.repositoryKey[this.repo][this.store.active || 'active'];
      try {
        await action(id);
        this.fetchDataIndex();
      } catch (e) {
        console.error(e);
      }
    },

    async onDelete($id = this.itemId, $label = "Delete") {
      const result = await this.showSwal({
        title: $label + ` ID: ${$id} ?`,
        text: "",
        icon: "question",
        type: "warning",
        showDenyButton: false,
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Accept",
        cancelButtonText: "Cancel",
      });

      if (result) {
        try {
          await this.repositoryKey[this.repo][this.store?.destroy || "destroy"]($id);
          this.fetchDataIndex();
        } catch (e) {
          console.log(e);
        }
      }
    },
    async unDelete() {
      this.$swal
        .fire({
          title: `Un Delete ID: ${this.itemId}?`,
          text: "",
          icon: "question",
          type: "warning",
          showDenyButton: false,
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Accept",
          cancelButtonText: "Cancel",
          customClass: {
            container: 'admin-swal',
          },
        })
        .then(async (result) => {
          if (result.isConfirmed) {
            try {
              const res = await this.repositoryKey[this.repository][
                this.store.unDelete
              ](this.itemId);
              // if (res.data.code === 200) {
              //   await this.$toasted.success(res.data.message);
              this.fetchDataIndex();
              // }
            } catch (e) {
              console.log(e);
            }
          }
        });
    },
    async onChangePage(page) {
      await this.storeDispatch("setQueryPage", {
        stateName: this.storeQueryItems,
        data: page || this.stateQueryItems?.page?.value || 1,
      });
      this.fetchDataIndex();
    },
    async fetchDataIndex() {
      try {
        await this.params.forEach((param, index) => {
          this.storeDispatch("setParamDefault", {
            query: param.query,
            data: param.value,
          });
        });

        const { dataSearch, dataOrigin, dataRoute } =
          await this.storeDispatch("convertDataSend", this.storeQueryItems);
        const result = await this.repositoryKey[this.repo][this.store.action || 'index']({
          input: Object.assign(dataSearch, this.stateParamDefault),
        });

        dataOrigin.response = result.data.response;
        this.storeDispatch("setState", {
          stateName: this.storeQueryItems,
          data: dataOrigin,
          query: dataRoute,
        });
      } catch (error) { }
    },
  },
};
