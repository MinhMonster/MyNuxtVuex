<template>
  <NavAdmin
    title="Ninja School Online"
    goBack
    next-page
    new-page
    filter
    @newPage="$router.push('/admin/game/ninjas/new')"
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
          <v-card-title
            >Total: {{ format_number(sum_value) }} Đ
          </v-card-title>
        </div>
      </div>
      <v-row>
        <v-col cols="12" md="12" sm="12">
          <!-- <v-card> -->
          <AdminBaseTable
            ref="table"
            module="admin/game/ninjas"
            repository="adminGameNinjas"
            :columns="columns"
            :store="{
              state: 'queryNinjas',
              module: 'admin.game.ninjas',
              action: 'fetchAccountNinjas',
            }"
          >
            <template #actions="props">
              <v-btn light icon :to="`/admin/game/ninjas/${props.row.ID}`">
                <v-icon>mdi-pencil-box-multiple-outline</v-icon>
              </v-btn>
              <v-btn
                light
                color="blue"
                icon
                :to="`/teamobi/ninja-school/${props.row.ID}`"
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
import { mapActions } from "vuex";

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
  name: "Ninjas",
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
          key: "taikhoan",
          label: "Account",
          attributes: {
            minWidth: "120",
          },
        },
        {
          key: "ingame",
          label: "In Game",
          attributes: {
            minWidth: "120",
          },
        },
        {
          key: "giatien",
          label: "Price",
          type: "number",
          attributes: {},
        },
        {
          key: "class",
          label: "Class",
          type: "class-ninja",
          attributes: {},
        },
        {
          key: "level",
          label: "Level",
          attributes: {},
        },
        {
          key: "server",
          label: "Server",
          type: "server-ninja",
          attributes: {},
        },
        {
          key: "loainick",
          label: "Type",
          type: "type-ninja",
          attributes: {},
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
    ...mapFields("admin/game/ninjas", {
      count: "queryNinjas.response.count",
      sum_value: "queryNinjas.response.sum_value",
      metaNinjas: "metaNinjas",
    }),
  },
  methods: {},
};
</script>

</style>
