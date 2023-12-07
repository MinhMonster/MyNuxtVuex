<template>
  <NavAdmin
    title="Daily Events"
    goBack
    next-page
    filter
    reload
    @reload="fetchData()"
  >
    <template #body>
      <v-row>
        <v-col cols="12" md="12" sm="12">
          <AdminBaseTable
            ref="table"
            module="admin/events/daily"
            repository="adminDailyEvents"
            :columns="columns"
            :store="{
              state: 'queryVotedDailyEvents',
              module: 'admin.events.daily',
              action: 'fetchVotedDailyEvents',
            }"
          >
          </AdminBaseTable>
        </v-col>
      </v-row>
    </template>
  </NavAdmin>
</template>

<script>
import NavAdmin from "@/components/pages/admin/layout/NavAdmin";
import AdminBaseTable from "@/components/pages/admin/base/AdminBaseTable";

export default {
  layout: "adminDev",
  components: {
    NavAdmin,
    AdminBaseTable,
  },
  name: "Avatars",
  data() {
    return {
      selected: {},
      columns: [
        {
          key: "ID",
          label: "ID",
          type: "number",
          attributes: {
            align: "center",
            style: {
              width: "100px",
            },
          },
        },
        {
          key: "voted",
          label: "Voted",
          attributes: {
            style: {
              width: "120px",
            },
          },
        },
        {
          key: "phone",
          label: "Phone",
          attributes: {
            style: {
              width: "120px",
            },
          },
        },
        {
          key: "name",
          label: "User",
          attributes: {
            style: {
              width: "120px",
            },
          },
        },
        {
          key: "uid",
          label: "UID",
          attributes: {
            style: {
              width: "100px",
            },
          },
        },
        {
          key: "time",
          label: "Time",
          attributes: {
            style: {
              width: "150px",
            },
          },
        },
      ],
    };
  },
  methods: {
    fetchData() {
      this.$refs.table.fetchData();
    },
  },
};
</script>
<style lang="scss" scoped>
</style>