<template>
  <NavAdmin
    title="Game DragonBalls"
    goBack
    next-page
    new-page
    filter
    @newPage="$router.push('/admin/game/dragon-balls/new')"
    reload
    @reload="$refs.table.fetchDataIndex()"
  >
    <template #body>
      <v-row>
        <v-col cols="12" md="12" sm="12">
          <AdminBaseTable ref="table" module="admin/game/dragonBalls">
            <template #id="props">
              <nuxt-link
                class="flex"
                light
                :to="`/admin/game/dragon-balls/${props.row.id}`"
              >
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
        </v-col>
        <template>
          <FormModal
            ref="modal"
            :key="queryItem.id"
            :title="'Update Account ID: ' + format_number(queryItem.id)"
            :id="queryItem.id"
            width="500px"
            minHeight="150px"
            module="admin/game/dragonBalls"
            :store="{
              formItem: 'formItemModal',
            }"
            @updated="$refs.table.fetchDataIndex()"
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
  name: "DragonBalls",
  computed: {
    ...mapFields("admin/game/dragonBalls", ["queryItem"]),
  },
  async mounted() {},
  methods: {
    async showModal(row = null) {
      this.queryItem = row;
      this.$refs.modal.dialog = true;
    },
  },
};
</script>
<style></style>
