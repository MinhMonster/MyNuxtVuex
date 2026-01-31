<template>
  <div class="page-body mt-6">
    <label>
      <i class="mdi mdi-history"></i> Lịch sử nạp Lượng, Carot của
    </label>
    <br />
    <small id="fileHelp" class="form-text text-muted"
      >Xem lại các Giao dịch gần nhất.</small
    >
    <BaseTable
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

          <span
            v-else
            v-html="columnsValue(column.type, value)"
            v-bind:key="index"
          >
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
import ButtonCoppy from "@/components/common/ButtonCoppy";
import clientCrud from "@/mixins/clientCrud";

export default {
  mixins: [clientCrud],
  components: {
    BaseTable,
    ButtonCoppy,
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
    valueCustom(row, column) {
      const value = this.getValue(row, column);
      return this.columnsValue(column.type, value);
    },
    async showTableModal(row) {
      await this.updateStateQueryItem(row);
      this.$refs.tableModal.show();
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
