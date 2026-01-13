<template>
  <NavAdmin
    title="Update Account Dragon Ball"
    goBack
    next-page
    reload
    @reload="$refs.form.fetchData()"
    copy
    @copy="
      $router.push(`/admin/game/dragon-balls/new?copy=${$route.params.id}`)
    "
  >
    <template #body>
      <div id="body-admin">
        <AdminBaseForm
          ref="form"
          module="admin/game/dragonBalls"
          :id="$route.params.id"
        ></AdminBaseForm>
      </div>
    </template>
  </NavAdmin>
</template>

<script>
import NavAdmin from "@/components/pages/admin/layout/NavAdmin";
import AdminBaseForm from "@/components/pages/admin/base/AdminBaseForm";

export default {
  layout: "adminDev",
  name: "UpdateAccountNinja",
  components: {
    NavAdmin,
    AdminBaseForm,
  },
};
</script>
