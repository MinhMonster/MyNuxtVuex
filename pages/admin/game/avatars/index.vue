<template>
  <NavAdmin
    title="Game Avatars"
    goBack
    next-page
    new-page
    filter
    @newPage="$router.push('/admin/game/avatars/new')"
    reload
    @reload="$refs.table.fetchData()"
  >
    <template #body>
      <div class="d-flex" align="center">
        <div>
          <v-card-title class="mgl--15px"
            >Account: {{ format_number(count) }}
          </v-card-title>
        </div>
        <v-spacer />
        <div class="mgr--15px right middle">
          <v-card-title>Total: {{ format_number(sum_value) }} Đ </v-card-title>
        </div>
      </div>
      <v-row>
        <v-col cols="12" md="12" sm="12">
          <!-- <v-card> -->
          <AdminBaseTable
            ref="table"
            module="admin/game/avatars"
            repository="adminGameAvatars"
            :columns="columns"
            :store="{
              state: 'queryAvatars',
              module: 'admin.game.avatars',
              action: 'fetchAccountAvatars',
            }"
          >
            <template #actions="props">
              <v-btn light icon :to="`/admin/game/avatars/${props.row.ID}`">
                <v-icon>mdi-pencil-box-multiple-outline</v-icon>
              </v-btn>
              <v-btn
                light
                color="blue"
                icon
                :to="`/teamobi/avatar/${props.row.ID}`"
              >
                <v-icon>mdi-eye</v-icon>
              </v-btn>
            </template>
          </AdminBaseTable>
          <!-- </v-card> -->
        </v-col>
      </v-row>
    </template>
  </NavAdmin>
</template>

<script>
import { mapFields } from "vuex-map-fields";

import NavAdmin from "@/components/pages/admin/layout/NavAdmin";
import FormSearch from "@/components/pages/admin/Shared/form/FormSearch";
import AdminBaseTable from "@/components/pages/admin/base/AdminBaseTable";
export default {
  layout: "adminDev",
  components: {
    NavAdmin,
    FormSearch,
    AdminBaseTable,
  },
  name: "Avatars",
  data() {
    return {
      columns: [
        {
          key: "ID",
          label: "ID",
          type: "number",
          attributes: {
            align: "center",

            style: {
              "min-width": 120,
            },
          },
        },
        {
          key: "username",
          label: "Account",
        },
        {
          key: "dat",
          label: "Đất",
          type: "number",
        },
        {
          key: "ga",
          label: "Gà",
          type: "number",
        },
        {
          key: "ca",
          label: "Cá",
        },
        {
          key: "giatien",
          label: "Price",
          type: "number",
        },
        {
          key: "status",
          label: "Status",
          type: "status-ninja",
          attributes: {},
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
  computed: {
    ...mapFields("admin/game/avatars", {
      count: "queryAvatars.response.count",
      sum_value: "queryAvatars.response.sum_value",
    }),
  },
  methods: {},
};
</script>
<style >

</style>