<template>
  <NavAdmin
    title="Ninja School Online"
    goBack
    next-page
    new-page
    filter
    @newPage="$router.push('/admin/game/ninjas/new')"
    reload
    @reload="fetchAccountNinjas()"
  >
    <template v-if="ninjas" #body>
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
              :data="ninjas"
              :meta="metaNinjas"
              @onChange="onPageChange"
            >
              <template #action="props">
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
import FormSearch from "@/components/pages/admin/Shared/form/FormSearch";
import BaseTable from "@/components/base/BaseTable";

export default {
  layout: "adminDev",
  components: {
    NavAdmin,
    FormSearch,
    BaseTable
  },
  head() {
    return {
      title: "Admin: Ninjas",
      meta: [
        {
          hid: "Admin: Ninjas",
          name: "Admin: Ninjas",
          content: "Admin: Ninjas",
        },
      ],
    };
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

            style: { "min-width": 120 },
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
    await this.fetchAccountNinjas();
  },
  computed: {
    ...mapFields("admin/game/ninjas", {
      ninjas: "ninjas",
      sumPriceNinjas: "sumPriceNinjas",
      countNinjas: "countNinjas",
      metaNinjas: "metaNinjas",
    }),
  },
  methods: {
    ...mapActions("admin/game/ninjas", ["fetchAccountNinjas", "setQuery", "resetQuery"]),
    async onPageChange(page) {
      await this.setQuery({ page });
      await this.fetchAccountNinjas();
      await this.$router.push(`/admin/game/ninjas?page=${page}`);
    },
    search() {
      this.fetchAccountNinjas();
    },
  },
};
</script>

</style>