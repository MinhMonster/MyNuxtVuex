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
          module="admin/sale_offs"
          repository="adminSaleOffs"
          :id="$route.params.id"
          :store="{
            state: 'querySaleOff',
            module: 'admin.sale_offs',
            form: 'formSaleOff',
            action: 'fetchSaleOff',
            update: 'updateSaleOff'
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
};
</script>
