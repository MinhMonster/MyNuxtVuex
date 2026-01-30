import { mapState } from "vuex";
import { mapFields } from "vuex-map-fields";

export default {
  props: {
    id: {
      type: [String, Number],
      defualt: null,
      require: false
    },
    store: {
      type: Object,
      default: () => {
        return {};
      }
    },
    module: {
      type: String,
      default: "",
      require: true
    },
    repository: {
      type: String,
      default: "",
      require: false
    },
    repositories: {
      type: String,
      default: "repositories",
      require: false
    },
    images: {
      type: String,
      default: "images",
      require: false
    },
    multipleImages: {
      type: Boolean,
      default: () => {
        return true;
      }
    },
    columns: {
      type: Array,
      default: () => []
    },
    isFilterForm: {
      type: Boolean,
      default: () => {
        return false;
      }
    },
    params: {
      type: Array,
      default: () => [],
      require: false,
    },
  },
  computed: {
    ...mapFields("global", {
      isLoadingSearch: "isLoadingSearch"
    }),
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
      return this.store?.queryItem || "queryItem";
    },
    storeQueryItems() {
      return this.store?.queryItems || "queryItems";
    },
    storeFormItem() {
      return this.store?.formItem || "formItem";
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
      stateQueryPath() {
        return this.stateModule["queryPath"] || "/";
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
      isShowNext() {
        return this.meta?.page < this.meta?.pages;
      },
      cost_value(state) {
        return _.get(
          state,
          this.stateModule +
          "." +
          this.storeQueryItems +
          ".response.cost_value",
          0
        );
      },
      profit_value(state) {
        return _.get(
          state,
          this.stateModule +
          "." +
          this.storeQueryItems +
          ".response.profit_value",
          0
        );
      },
      haveStore() {
        return !_.isEmpty(this.store);
      }
    }),
    dataForm() {
      if (!this.isFilterForm) {
        return _.cloneDeep(this.stateQueryItem);
      }
      const allowedFields = this.stateForms.map(f => f.value);
      const data = _.cloneDeep(this.stateQueryItem);
      return Object.fromEntries(
        Object.entries(data).filter(
          ([key]) => key === "id" || allowedFields.includes(key)
        )
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
    }
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
        data: data
      });
    },
    async fetchData() {
      try {
        this.ready = false;
        const result = await this.repositoryKey[this.repo][
          this.store.action || "fetch"
        ](this.itemId);

        const data = result.data.response;
        if (data) {
          this.updateStateQueryItem(data);
        } else {
          this.$router.push(this.path.replace(this.itemId, ""));
        }
        setTimeout(() => {
          this.ready = true;
        }, 500);
      } catch (error) {
        this.ready = true;

      }
    },
    async onModify(method = null) {
      const action = this.repositoryKey[this.repo][
        method || this.store.modify || "modify"
      ];

      try {
        const isUpdate = this.itemId && !this.isQueryCopy;

        const payload = {
          ...(isUpdate ? { id: this.itemId } : {}),
          input: isUpdate
            ? this.stateQueryItem
            : _.omit(this.stateQueryItem, "id")
        };

        await action(payload);

        if (!isUpdate) {
          this.$router.push(this.path.replace("new", ""));
        }
        this.$emit("updated", payload);
      } catch (e) {
        console.error(e);
      }
    },

    async executeAction(method = null) {
      const action = this.repositoryKey[this.repo][
        method || this.store.modify || "modify"
      ];
      try {
        await action(this.stateQueryItem);
        this.$emit("updated", this.stateQueryItem);
      } catch (e) {
        console.error(e);
      }
    },

    async onActive(id) {
      const action = this.repositoryKey[this.repo][
        this.store.active || "active"
      ];
      try {
        await action(id);
        this.fetchDataIndex();
      } catch (e) {
        console.error(e);
      }
    },

    async onDelete($id = this.itemId) {
      const result = await this.showSwal({
        title: `Delete ID: ${$id} ?`,
        text: "",
        icon: "question",
        type: "warning",
        showDenyButton: false,
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Accept",
        cancelButtonText: "Cancel"
      });

      if (result) {
        try {
          await this.repositoryKey[this.repo][this.store?.destroy || "destroy"](
            $id
          );
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
            container: "admin-swal"
          }
        })
        .then(async result => {
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
        data: page || this.stateQueryItems?.page?.value || 1
      });
      console.log("onChangePage");

      this.fetchDataIndex();
    },
    resetDataPage() {
      return this.storeDispatch("resetDataPage", this.storeQueryItems);
    },
    resetQueryItems() {
      return this.storeDispatch("resetData", this.storeQueryItems);
    },

    async resetDataIndex() {

      this.onChangePage(1);
    },

    // load more (đổi tên cho đúng nghĩa)
    async loadNextPage() {
      if (!this.isShowNext) return;
      let page = this.stateQueryItems?.page?.value || 1
      await this.storeDispatch("setQueryPage", {
        stateName: this.storeQueryItems,
        data: page + 1
      });
      this.fetchDataIndex(true);

    },
    async fetchDataIndex(loadMore = false) {
      try {
        this.isLoadingSearch = true

        this.params.forEach(param => {
          this.storeDispatch("setParamQuery", {
            stateName: this.storeQueryItems,
            query: param.query,
            data: param.data,
            silent: true,
          });
        });

        const { dataSearch, dataOrigin, dataRoute } =
          await this.storeDispatch("convertDataSend", this.storeQueryItems)

        const result = await this.repositoryKey[this.repo][
          this.store.action || "index"
        ]({
          input: Object.assign(dataSearch, this.stateParamDefault),
        })
        console.log("result");


        setTimeout(() => {
          this.isLoadingSearch = false;
          // =========================
          // 🔥 LOAD MORE LOGIC
          // =========================
          if (loadMore && dataOrigin.response?.data?.length) {
            const merged = [
              ...dataOrigin.response.data,
              ...result.data.response.data,
            ];

            dataOrigin.response = {
              ...result.data.response,
              data: _.uniqBy(merged, item => item.id ?? item.code),
            };
          } else {
            // fetch mới (search / reset)
            dataOrigin.response = result.data.response
          }
          // =========================
          // SET STATE
          // =========================
          this.storeDispatch("setState", {
            stateName: this.storeQueryItems,
            data: dataOrigin,
            query: loadMore ? undefined : dataRoute,
          })
        }, 300);
      } catch (error) {
        this.isLoadingSearch = false
      }
    }

  }
};
