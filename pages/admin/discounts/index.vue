<template>
  <NavAdmin
    title="List Sale Offs"
    goBack
    new-page
    next-page
    reload
    @reload="$refs.table.fetchData()"
    @newPage="$router.push('/admin/discounts/new')"
  >
    <template #body>
      <v-row>
        <v-col cols="12" md="12" sm="12">
          <AdminBaseTable
            ref="table"
            module="admin/discounts"
            :repositories="repositories"
            repository="adminDiscounts"
            :columns="columns"
            :store="{
              state: 'querySaleOffs',
              module: 'admin.discounts',
              action: 'fetchSaleOffs',
            }"
          >
            <template #id="props">
              <v-btn none icon :to="`/admin/discounts/${props.row.id}`">
                <v-icon color="blue">mdi-pencil</v-icon>
              </v-btn>
            </template>
            <template #is_active="props">
              <BaseCheckBox
                :value="props.row.is_active"
                @change="(value) => onchange(value, props.row)"
              ></BaseCheckBox>
            </template>
          </AdminBaseTable>
        </v-col>
      </v-row>
    </template>
  </NavAdmin>
</template>

<script>
import { mapState } from "vuex";
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
          key: "id",
          label: "ID",
          attributes: {
            style: {
              minWidth: "50px",
            },
          },
        },
        {
          key: "is_active",
          label: "Active",
        },
        {
          key: "price_tiers[0].value",
          label: "100k",
        },
        {
          key: "price_tiers[1].value",
          label: "300k",
        },
        {
          key: "price_tiers[2].value",
          label: "500k",
        },
        {
          key: "price_tiers[3].value",
          label: "1 Triệu 500k",
        },
        {
          key: "price_tiers[4].value",
          label: "2 Triệu",
        },
        {
          key: "price_tiers[5].value",
          label: "3 Triệu 500k",
        },
        {
          key: "price_tiers[6].value",
          label: "5 Triệu",
        },
        {
          key: "price_tiers[7].value",
          label: "10 Triệu",
        },
        {
          key: "type",
          label: "Type",
          type: "text",
          attributes: {
            style: {
              minWidth: "50px",
            },
          },
        },
        // {
        //   key: "actions",
        //   label: "Actions",
        //   type: "actions",
        //   attributes: {
        //     minWidth: "120",
        //   },
        // },
      ],
    };
  },
  async mounted() {},
  computed: {
    ...mapState("admin/mms", ["repositories"]),
  },
  methods: {
    async onchange(value, $data) {
      console.log("value", value, $data);
      await this.$repositories.adminDiscounts.setDefaultSaleOff({
        id: $data.ID,
        input: {
          value: value,
          type: $data.type,
        },
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
