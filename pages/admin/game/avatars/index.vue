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
            :repositories="repositories"
            repository="adminGameAvatars"
            :columns="columns"
            :store="{
              state: 'queryAvatars',
              module: 'admin.game.avatars',
              action: 'fetchAccountAvatars',
            }"
          >
            <template #id="props">
              <nuxt-link
                class="flex"
                light
                :to="`/admin/game/avatars/${props.row.id}`"
              >
                <!-- <v-icon size="15" class="text-info"
                  >mdi-arrow-right-bold</v-icon
                > -->
                #{{ format_number(props.row.id) }}
              </nuxt-link>
            </template>
            <template #selling_price="props">
              {{
                cash_atm(
                  props.row.selling_price *
                    (1 - (props.row.active_discount || 0) / 100)
                )
              }}
            </template>
            <template #purchase_price="props">
              <span class="text-danger">
                {{ format_number(props.row.purchase_price) }}
              </span>
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
            :title="'Update Account: ' + format_number(queryAvatar.id)"
            :id="queryAvatar.id"
            width="500px"
            minHeight="150px"
            module="admin/game/avatars"
            :repositories="repositories"
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
import { mapState } from "vuex";
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
          key: "id",
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
          key: "deleted_at",
          label: "Status",
          type: "deleted_at",
          attributes: {
            style: {
              minWidth: "50px",
            },
          },
        },
        {
          key: "land",
          label: "Đất",
          type: "number",
          attributes: {
            style: {
              minWidth: "70px",
            },
          },
        },
        {
          key: "pets",
          label: "Gà",
          type: "number",
          attributes: {
            style: {
              minWidth: "70px",
            },
          },
        },
        {
          key: "fish",
          label: "Cá",
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
    ...mapState("admin/mms", ["repositories"]),
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
