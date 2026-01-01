<template>
  <NavAdmin
    title="Update Topic"
    goBack
    next-page
    reload
    @reload="$refs.form.fetchData()"
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
            action: 'adminFetchProduct',
            update: 'adminCreateAndUpdateProduct',
            delete: 'adminDestroyTopic',
            unDelete: 'adminUnDestroyTopic',
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
import { mapActions, mapState } from "vuex";
export default {
  components: { NavAdmin, AdminBaseForm },
  layout: "adminDev",
  name: "UpdateProduct",
  computed: {
    ...mapState("admin/mimifood", ["repositories"]),
  },
};
</script>
