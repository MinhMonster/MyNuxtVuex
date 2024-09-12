<template>
  <NavAdmin
    title="List Sale Offs"
    goBack
    next-page
    reload
    @reload="$refs.table.fetchData()"
  >
    <template #body>
      <v-row>
        <v-col cols="12" md="12" sm="12">
          <AdminBaseTable
            ref="table"
            module="admin/sale_offs"
            repository="adminSaleOffs"
            :columns="columns"
            :store="{
              state: 'querySaleOffs',
              module: 'admin.sale_offs',
              action: 'fetchSaleOffs',
            }"
          >
            <template #actions="props">
              <v-btn light icon :to="`/admin/sale-offs/${props.row.ID}`">
                <v-icon>mdi-pencil-box-multiple-outline</v-icon>
              </v-btn>
            </template>
            <template #is_default="props">
              <BaseCheckBox
                :value="props.row.is_default"
                @change="(value) => onchange(value, props.row.ID)"
              ></BaseCheckBox>
            </template>
          </AdminBaseTable>
        </v-col>
      </v-row>
    </template>
  </NavAdmin>
</template>

<script>
import NavAdmin from "@/components/pages/admin/layout/NavAdmin";
import FormSearch from "@/components/pages/admin/Shared/form/FormSearch";
import AdminBaseTable from "@/components/pages/admin/base/AdminBaseTable";
import BaseCheckBox from "@/components/pages/admin/base/form/BaseCheckBox";
export default {
  layout: "adminDev",
  components: {
    NavAdmin,
    FormSearch,
    AdminBaseTable,
    BaseCheckBox,
  },
  name: "Ninjas",
  data() {
    return {
      columns: [
        {
          key: "ID",
          label: "ID",
        },
        {
          key: "is_default",
          label: "Active",
        },
        {
          key: "sale_100k",
          label: "100k",
        },
        // {
        //   key: "sale_200k",
        //   label: "200k",
        // },
        {
          key: "sale_300k",
          label: "300k",
        },
        {
          key: "sale_500k",
          label: "500k",
        },
        {
          key: "sale_1000k",
          label: "1 Triệu",
        },
        {
          key: "sale_1500k",
          label: "1 Triệu 500k",
        },
        {
          key: "sale_2000k",
          label: "2 Triệu",
        },
        {
          key: "sale_2500k",
          label: "2 Triệu 500k",
        },
        {
          key: "sale_3000k",
          label: "3 Triệu",
        },

        {
          key: "actions",
          label: "Actions",
          type: "actions",
          attributes: {
            minWidth: "120",
          },
        },
      ],
    };
  },
  async mounted() {},
  methods: {
    async onchange(value, ID) {
      console.log("value", value, ID);
      await this.$repositories.adminSaleOffs.setDefaultSaleOff({
        id: ID,
        value: value,
      });
      this.$refs.table.fetchData();
    },
  },
};
</script>
<style lang="scss" scoped>
::v-deep {
  .table th {
    min-width: 110px;
  }
}
</style>
