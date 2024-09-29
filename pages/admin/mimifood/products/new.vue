<template>
  <NavAdmin
    title="Create Products"
    goBack
    next-page
    reload
    @reload="$refs.form.resetForm()"
  >
    <template #body>
      <div id="body-admin">
        <AdminBaseForm
          ref="form"
          module="admin/mimifood/products"
          repository="mimiFoodProducts"
          images="images"
          :repositories="repositories"
          :id="$route.params.id"
          :store="{
            state: 'queryTopic',
            module: 'admin.mimifood.products',
            form: 'formTopic',
            create: 'adminCreateAndUpdateProduct',
          }"
          multipleImages
        ></AdminBaseForm>
      </div>
    </template>
  </NavAdmin>
</template>

<script>
import NavAdmin from "@/components/pages/admin/layout/NavAdmin";
import AdminBaseForm from "@/components/pages/admin/base/AdminBaseForm";
import { mapState } from "vuex";

export default {
  components: { NavAdmin, AdminBaseForm },
  layout: "adminDev",
  name: "CreateProduct",
  computed: {
    ...mapState("admin/mimifood", ["repositories"]),
  },
};
</script>
