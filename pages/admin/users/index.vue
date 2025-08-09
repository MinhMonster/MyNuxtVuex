<template>
  <NavAdmin
    title="Users"
    goBack
    next-page
    filter
    reload
    @reload="$refs.table.fetchData()"
  >
    <template #body>
      <v-row>
        <v-col cols="12" md="12" sm="12">
          <AdminBaseTable
            ref="table"
            module="admin/users"
            :repositories="repositories"
            repository="adminUsers"
            :columns="columns"
            :store="{
              state: 'queryUsers',
              module: 'admin.users',
              action: 'fetchUsers',
            }"
          >
            <template #action="props">
              <v-btn light icon @click="showModal(props.row)">
                <v-icon>mdi-pencil-box-multiple-outline</v-icon>
              </v-btn>
            </template>
          </AdminBaseTable>
        </v-col>
      </v-row>
      <FormModal
        ref="modal"
        :title="'Update Cash:'"
        :subTitle="queryUser.name"
        :id="queryUser.id"
        width="350px"
        minHeight="150px"
        module="admin/users"
        :reset="false"
        :repositories="repositories"
        repository="adminUsers"
        :store="{
          state: 'queryUserCash',
          module: 'admin.users',
          form: 'formUpdateCash',
          update: 'updateCashUser',
        }"
        @updated="$refs.table.fetchData()"
      />
    </template>
  </NavAdmin>
</template>

<script>
import { mapFields } from "vuex-map-fields";
import { mapState } from "vuex";
import NavAdmin from "@/components/pages/admin/layout/NavAdmin";
import FormModal from "@/components/pages/admin/base/modal/FormModal";
import AdminBaseTable from "@/components/pages/admin/base/AdminBaseTable";

export default {
  layout: "adminDev",
  components: {
    NavAdmin,
    AdminBaseTable,
    FormModal,
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
  name: "AdminUsers",
  data() {
    return {
      userSelected: null,
      columns: [
        {
          key: "id",
          label: "ID",
          attributes: {},
        },
        {
          key: "name",
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
          key: "cash",
          label: "Cash",
          type: "number",
          attributes: {},
        },
        {
          key: "action",
          label: "Actions",
          type: "actions",
          attributes: {
            style: {
              minWidth: "50px",
            },
          },
        },
      ],
    };
  },
  computed: {
    ...mapState("admin/mms", ["repositories"]),
    ...mapFields("admin/users", {
      queryUser: "queryUser",
      queryUserCash: "queryUserCash",
      cash: "queryUserCash.cash",
    }),
  },
  methods: {
    showModal(row) {
      this.$refs.modal.show();
      this.queryUser = row;
      this.cash = row.cash;
    },
  },
};
</script>
