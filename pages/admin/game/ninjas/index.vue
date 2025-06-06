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
            <template #ID="props">
              <nuxt-link light :to="`/admin/game/ninjas/${props.row.ID}`">
                <v-icon size="15" class="text-info"
                  >mdi-arrow-right-bold</v-icon
                >
                {{ format_number(props.row.ID) }}
              </nuxt-link>
            </template>
            <template #giatien="props">
              {{ cash_atm(props.row.giatien * (1 - props.row.saleOff / 100)) }}
            </template>
            <template #gianhap="props">
              <span class="text-danger">{{
                format_number(props.row.gianhap)
              }}</span>
            </template>
            <template #profit="props">
              <span class="text-success">{{ profit_atm(props.row) }}</span>
            </template>
            <template #actions="props">
              <v-btn light icon @click="showModal(props.row)">
                <v-icon size="20" class="text-info">mdi-cash-edit</v-icon>
              </v-btn>
            </template>
          </AdminBaseTable>
          <!-- </v-card> -->
        </v-col>
      </v-row>
      <FormModal
        ref="modal"
        :title="'Update Account: ' + format_number(queryNinja.ID)"
        :id="queryNinja.ID"
        width="500px"
        minHeight="150px"
        module="admin/game/ninjas"
        repository="adminGameNinjas"
        :store="{
          state: 'queryNinja',
          module: 'admin.game.ninjas',
          form: 'formModalNinja',
          // action: 'fetchGameAccountSold',
          update: 'updateAccountNinja',
        }"
        @updated="$refs.table.fetchData()"
      />
    </template>
  </NavAdmin>
</template>

<script>
import { mapFields } from "vuex-map-fields";
import NavAdmin from "@/components/pages/admin/layout/NavAdmin";
import AdminBaseTable from "@/components/pages/admin/base/AdminBaseTable";
import FormModal from "@/components/pages/admin/base/modal/FormModal";

export default {
  layout: "adminDev",
  components: {
    NavAdmin,
    AdminBaseTable,
    FormModal,
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
              minWidth: "60px",
            },
          },
        },
        {
          key: "taikhoan",
          label: "Account",
          attributes: {
            style: {
              minWidth: "150px",
            },
          },
        },
        {
          key: "ingame",
          label: "In Game",
          attributes: {
            style: {
              minWidth: "150px",
            },
          },
        },
        {
          key: "status",
          label: "Status",
          type: "status-ninja",
          attributes: {
            style: {
              minWidth: "60px",
            },
          },
        },
        {
          key: "class",
          label: "Class",
          type: "class-ninja",
          attributes: {
            style: {
              minWidth: "70px",
            },
          },
        },
        {
          key: "level",
          label: "Level",
          attributes: {
            style: {
              minWidth: "70px",
            },
          },
        },
        {
          key: "server",
          label: "Server",
          type: "server-ninja",
          attributes: {
            style: {
              minWidth: "150px",
            },
          },
        },
        {
          key: "loainick",
          label: "Type",
          type: "type-ninja",
          attributes: {
            style: {
              minWidth: "70px",
            },
          },
        },
        {
          key: "giatien",
          label: "Price",
          type: "number",
          attributes: {
            class: "text-right",
            style: {
              minWidth: "60px",
            },
          },
        },
        {
          key: "gianhap",
          label: "Cost",
          type: "number",
          attributes: {
            // class: 'text-right',
            style: {
              minWidth: "60px",
            },
          },
        },
        {
          key: "profit",
          label: "Profit",
          type: "number",
          attributes: {
            class: "text-right",
            style: {
              minWidth: "60px",
            },
          },
        },

        {
          key: "actions",
          label: "Actions",
          type: "actions",
          attributes: {
            align: "center",
            style: {
              maxWidth: "60px",
            },
          },
        },
      ],
    };
  },
  computed: {
    ...mapFields("admin/game/ninjas", ["queryNinja"]),
  },
  async mounted() {},
  methods: {
    showModal(row = null) {
      this.queryNinja = row;
      this.$refs.modal.dialog = true;
    },
  },
};
</script>