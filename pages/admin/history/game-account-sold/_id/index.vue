<template>
  <NavAdmin
    title="Update Account Sold"
    goBack
    next-page
    reload
    @reload="$refs.form.fetchData()"
  >
    <template #body>
      <div id="body-admin">
        <AdminBaseForm
          ref="form"
          module="admin/histories/game_account_sold"
          repository="adminGameAccountSold"
          :id="$route.params.id"
          :store="{
            state: 'queryGameAccountSold',
            module: 'admin.histories.game_account_sold',
            form: 'formAccountSold',
            action: 'fetchGameAccountSold',
            update: 'updateGameAccountSold',
          }"
        ></AdminBaseForm>
      </div>
    </template>
  </NavAdmin>
</template>

<script>
import NavAdmin from "@/components/pages/admin/layout/NavAdmin";
import AdminBaseForm from "@/components/pages/admin/base/AdminBaseForm";

export default {
  components: {
    NavAdmin,
    AdminBaseForm,
  },
  layout: "adminDev",
  name: "UpdateAccountSold",
  props: {},
  data() {
    return {};
  },
  async mounted() {},
  computed: {},
  methods: {},
};
</script>
<style >
</style>
