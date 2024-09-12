<template>
  <NavAdmin title="Users" goBack next-page filter reload @reload="fetchUsers()">
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
              :data="users"
              :meta="metaNinjas"
              @onChange="onPageChange"
            >
              <template #action="props">
                <v-btn light icon @click="showModal(props.row)">
                  <v-icon>mdi-pencil-box-multiple-outline</v-icon>
                </v-btn>
              </template>
            </BaseTable>
          </v-card>
        </v-col>
      </v-row>
      <FormUpdateCash ref="modal" />
    </template>
  </NavAdmin>
</template>

<script>
import { mapFields } from "vuex-map-fields";
import { mapActions } from "vuex";

import NavAdmin from "@/components/pages/admin/layout/NavAdmin";
import FormSearch from "@/components/pages/admin/users/form/FormSearch";
import BaseTable from "@/components/base/BaseTable";
import FormUpdateCash from "@/components/pages/admin/users/form/FormUpdateCash";

export default {
  layout: "adminDev",
  components: {
    NavAdmin,
    FormSearch,
    BaseTable,
    FormUpdateCash,
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
      userSelected: null,
      columns: [
        {
          key: "ID",
          label: "ID",
          attributes: {
            align: "center",
          },
        },
        {
          key: "Ffname",
          label: "Name",
          attributes: {},
        },
        {
          key: "phone",
          label: "Phone",
          attributes: {},
        },
        {
          key: "email",
          label: "Email",
          attributes: {},
        },
        {
          key: "sodu",
          label: "Cash",
          type: "number",
          attributes: {},
        },
        {
          key: "admin",
          label: "Admin",
          type: "number",
          attributes: {},
        },
        {
          key: "username",
          label: "User Name",
          attributes: {},
        },

        {
          key: "uid",
          label: "UID",
          attributes: {},
        },
        // {
        //   key: "create_time",
        //   label: "Created",
        //   attributes: {},
        // },
        {
          key: "login_at",
          label: "Login",
          attributes: {
            style: {
              minWidth: "150px",
            }
          },
        },
        {
          key: "action",
          label: "Actions",
          type: "actions",
          attributes: {
            style: {
              minWidth: "50px",
            }
          },
        },
      ],
    };
  },
  async mounted() {
    await this.fetchUsers();
  },
  computed: {
    ...mapFields("admin/users", {
      user: "user",
      users: "users",
      sumPriceNinjas: "sumPriceNinjas",
      countNinjas: "countNinjas",
      metaNinjas: "metaNinjas",
    }),
  },
  methods: {
    ...mapActions("admin/users", ["fetchUsers", "resetQuery", "setQuery"]),
    async onPageChange(page) {
      await this.setQuery({ page });
      await this.fetchUsers();
      await this.$router.push(`/admin/users?page=${page}`);
    },
    search() {
      this.fetchUsers();
    },
    showModal(row) {
      this.$refs.modal.dialog = true;
      this.user = row;
    },
  },
};
</script>

</style>
