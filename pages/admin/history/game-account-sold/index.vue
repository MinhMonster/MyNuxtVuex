<template>
  <NavAdmin
    title="Game Accoutn Solds"
    goBack
    next-page
    filter
    reload
    @reload="fetchGameAccountSolds()"
  >
    <template #body>
      <div class="d-flex" align="center">
        <div>
          <v-card-title class="mgl--15px"
            >Account: {{ format_number(countNinjas) }}
          </v-card-title>
        </div>
        <v-spacer />
        <div class="mgr--15px right middle">
          <v-card-title
            >Total: {{ format_number(sumPriceNinjas) }} Đ
          </v-card-title>
        </div>
      </div>
      <v-row>
        <v-col v-if="isFilter" cols="12">
          <FormSearch @search="search()"></FormSearch>
        </v-col>
        <v-col cols="12" md="12" sm="12">
          <v-card>
            <BaseTable
              :columns="columns"
              :data="gameAccountSolds"
              :meta="metaNinjas"
              @onChange="onPageChange"
            >
              <template #action="props">
                <v-btn
                  light
                  icon
                  :to="`/admin/history/game-account-sold/${props.row.ID}`"
                >
                  <v-icon>mdi-pencil-box-multiple-outline</v-icon>
                </v-btn>
              </template>
            </BaseTable>
          </v-card>
        </v-col>
      </v-row>
    </template>
  </NavAdmin>
</template>

<script>
import { mapFields } from "vuex-map-fields";
import { mapActions } from "vuex";

import NavAdmin from "@/components/pages/admin/layout/NavAdmin";
import FormSearch from "@/components/pages/admin/histories/game_account_sold/FormSearch";
import BaseTable from "@/components/base/BaseTable";

export default {
  layout: "adminDev",
  components: {
    NavAdmin,
    FormSearch,
    BaseTable,
  },
  name: "AdminSoldNinjas",
  data() {
    return {
      columns: [
        {
          key: "ID",
          label: "ID",
          attributes: {
            align: "center",
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
          key: "giatien",
          label: "Price",
          type: "number",
          attributes: {},
        },
        {
          key: "idnick",
          label: "ID Nick",
          type: "number",
          attributes: {},
        },
        {
          key: "type",
          label: "Game",
          attributes: {},
        },
        {
          key: "name",
          label: "User",
          attributes: {},
        },
        {
          key: "action",
          label: "Actions",
          type: "actions",
          attributes: {
            minWidth: "120",
          },
        },
      ],
    };
  },
  async mounted() {
    await this.fetchGameAccountSolds();
  },
  computed: {
    ...mapFields("admin/histories/game_account_sold", {
      gameAccountSolds: "gameAccountSolds",
      sumPriceNinjas: "sumPriceNinjas",
      countNinjas: "countNinjas",
      metaNinjas: "metaNinjas",
    }),
  },
  methods: {
    ...mapActions("admin/histories/game_account_sold", [
      "fetchGameAccountSolds",
      "resetQuery",
      "setQuery",
    ]),
    async onPageChange(page) {
      await this.setQuery({ page });
      await this.fetchGameAccountSolds();
      await this.$router.push(`/admin/history/game-account-sold?page=${page}`);
    },
    search() {
      this.fetchGameAccountSolds();
    },
  },
};
</script>

</style>