<template>
  <NavAdmin
    title="Setting Sale Off"
    goBack
    next-page
    reload
    @reload="$refs.form.fetchData()"
  >
    <template #body>
      <div id="body-admin">
        <AdminBaseForm
          ref="form"
          module="admin/discounts"
          :repositories="repositories"
          repository="adminDiscounts"
          :id="$route.params.id"
          :store="{
            state: 'querySaleOff',
            module: 'admin.discounts',
            form: 'formSaleOff',
            action: 'fetchSaleOff',
            update: 'updateSaleOff',
          }"
        ></AdminBaseForm>
      </div>
    </template>
  </NavAdmin>
</template>

<script>
import { mapState } from "vuex";
import NavAdmin from "@/components/pages/admin/layout/NavAdmin";
import AdminBaseForm from "@/components/pages/admin/base/AdminBaseForm";

export default {
  components: {
    NavAdmin,
    AdminBaseForm,
  },
  layout: "adminDev",
  name: "UpdateAccountSold",
    computed: {
    ...mapState("admin/mms", ["repositories"]),
  },
};
</script>
