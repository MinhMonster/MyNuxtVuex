<template>
  <div :class="{ 'page-body': !notBorder }">
    <label v-if="tableTitle">
      <i v-if="tableIcon" :class="'mdi mdi-' + tableIcon"></i>
      {{ tableTitle }}
    </label>
    <br />
    <small v-if="tableContent" id="fileHelp" class="form-text text-muted">
      {{ tableContent }}
    </small>
    <div
      v-if="isLoadingSearch"
      class="center mgt--50px mgb--50px loading-resoult"
    >
      <Loading></Loading>
    </div>
    <BaseTable
      v-else
      :columns="stateColumns"
      :data="dataSource"
      :meta="meta"
      @onChange="onChangePage"
    >
      <template
        v-for="(column, index) in stateColumns"
        #[column.key]="{ row, value }"
      >
        <slot :name="column.key" :row="row" :value="value">
          <v-btn
            v-if="column.key === 'actions' && isTableModal"
            color="info"
            class="btn-sm pd-10px"
            @click="showTableModal(row)"
          >
            Xem
          </v-btn>
          <Status v-else-if="column.key === 'status'" :value="value" />
          <span v-else v-html="columnsValue(column, value)" v-bind:key="index">
          </span>
          <ButtonCoppy
            v-if="column?.copy"
            :content="getValue(row, column)"
          ></ButtonCoppy>
        </slot>
      </template>
      <template name="actions"> </template>
    </BaseTable>
    <BaseTableModal
      v-if="isTableModal"
      :title="titleModal"
      :itemInfos="itemInfos"
      hiddenFooter
      ref="tableModal"
    >
      <slot name="table-modal" :row="stateQueryItem"></slot>
    </BaseTableModal>
  </div>
</template>
<script>
import BaseTable from "@/components/base/BaseTable";
import Loading from "@/components/global/molecules/common/Loading";
import ButtonCoppy from "@/components/common/ButtonCoppy";
import Status from "@/components/global/molecules/common/Status";
import clientCrud from "@/mixins/clientCrud";

export default {
  name: "BaseTableSearch",
  mixins: [clientCrud],
  components: {
    BaseTable,
    Loading,
    ButtonCoppy,
    Status,
  },
  props: {
    tableTitle: String,
    tableIcon: String,
    isTableModal: Boolean,
    titleModal: String,
    tableContent: String,
    notBorder: Boolean,
  },
  mounted() {},
  computed: {
    accountImages() {
      return (this.account?.images || []).map(this.normalizeImage);
    },
    itemInfos() {
      return this.storeGetter("getTableInfos")(this.stateQueryItem);
    },
  },
  methods: {
    getValue(row, column) {
      const key = column.key;
      const value = _.get(
        `${column.key_main ? column.key_main + "." : ""}${key}`,
        null
      );
      return value;
    },

    async showTableModal(row) {
      await this.updateStateQueryItem(row);
      this.$refs.tableModal.show();
    },
    async showItemModal(row) {
      await this.showTableModal(row);
      this.fetchDataIndex();
    },
  },
  async created() {
    await this.storeDispatch("passDataFromQuery", {
      stateName: this.storeQueryItems,
      query: this.$route.query,
    });
    this.fetchDataIndex();
  },
};
</script>
<style lang="scss" scoped>
</style>
