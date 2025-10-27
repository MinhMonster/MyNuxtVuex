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
            <!-- <template #actions="props">
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
            </template> -->
            <template #ID="props">
              <nuxt-link
                class="flex"
                light
                :to="`/admin/game/avatars/${props.row.ID}`"
              >
                <v-icon size="15" class="text-info"
                  >mdi-arrow-right-bold</v-icon
                >
                {{ format_number(props.row.ID) }}
              </nuxt-link>
            </template>
            <template #giatien="props">
              {{
                format_number(props.row.giatien * (1 - props.row.saleOff / 100))
              }}
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
        <template>
          <FormModal
            ref="modal"
            :title="'Update Account: ' + format_number(queryAvatar.ID)"
            :id="queryAvatar.ID"
            width="500px"
            minHeight="150px"
            module="admin/game/avatars"
            repository="adminGameAvatars"
            :store="{
              state: 'queryAvatar',
              module: 'admin.game.avatars',
              form: 'formModalAvatar',
              // action: 'fetchGameAccountSold',
              update: 'updateAccountAvatar',
            }"
            @updated="$refs.table.fetchData()"
          />
        </template>
      </v-row>
    </template>
  </NavAdmin>
</template>

<script>
import { mapFields } from "vuex-map-fields";
import NavAdmin from "@/components/pages/admin/layout/NavAdmin";
import FormSearch from "@/components/pages/admin/Shared/form/FormSearch";
import AdminBaseTable from "@/components/pages/admin/base/AdminBaseTable";
import FormModal from "@/components/pages/admin/base/modal/FormModal";
export default {
  layout: "adminDev",
  components: {
    NavAdmin,
    FormSearch,
    AdminBaseTable,
    FormModal,
  },
  name: "Avatars",
  data() {
    return {
      columns: [
        {
          key: "ID",
          label: "ID",
          type: "number",
          fixed: "left",
          attributes: {
            align: "center",

            style: {
              minWidth: "80px",
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
          key: "status",
          label: "Status",
          type: "status-ninja",
          attributes: {
            style: {
              minWidth: "50px",
            },
          },
        },
        {
          key: "dat",
          label: "Đất",
          type: "number",
          attributes: {
            style: {
              minWidth: "70px",
            },
          },
        },
        {
          key: "ga",
          label: "Gà",
          type: "number",
          attributes: {
            style: {
              minWidth: "70px",
            },
          },
        },
        {
          key: "ca",
          label: "Cá",
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
              minWidth: "50px",
            },
          },
        },
        {
          key: "actions",
          label: "Actions",
          type: "actions",
          fixed: "right",
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
    ...mapFields("admin/game/avatars", ["queryAvatar"]),
  },
  async mounted() {},
  methods: {
    showModal(row = null) {
      this.queryAvatar = row;
      this.$refs.modal.dialog = true;
    },
  },
};
</script>
<style></style>
