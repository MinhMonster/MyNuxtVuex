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
            :repositories="repositories"
            repository="adminGameNinjas"
            :columns="columns"
            :store="{
              state: 'queryNinjas',
              module: 'admin.game.ninjas',
              action: 'fetchAccountNinjas',
            }"
          >
            <template #id="props">
              <nuxt-link light :to="`/admin/game/ninjas/${props.row.id}`">
                <v-icon size="15" class="text-primary"
                  >mdi-arrow-right-bold</v-icon
                >
                {{ format_number(props.row.id) }}
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
                <v-icon size="20" class="text-primary">mdi-cash-edit</v-icon>
              </v-btn>
            </template>
          </AdminBaseTable>
          <!-- </v-card> -->
        </v-col>
      </v-row>
      <FormModal
        ref="modal"
        :title="'Update Account: ' + format_number(queryNinja.id)"
        :id="queryNinja.id"
        width="500px"
        minHeight="150px"
        module="admin/game/ninjas"
        :repositories="repositories"
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
import { mapState } from "vuex";
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
          key: "id",
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
          key: "username",
          label: "Account",
          attributes: {
            style: {
              minWidth: "150px",
            },
          },
        },
        {
          key: "character_name",
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
          key: "type",
          label: "Type",
          type: "type-ninja",
          attributes: {
            style: {
              minWidth: "70px",
            },
          },
        },
        {
          key: "selling_price",
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
          key: "purchase_price",
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
    ...mapState("admin/mms", ["repositories"]),
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