<template>
  <NavAdmin
    :title="
      !isQueryCopy
        ? 'New Account Dragon Ball'
        : `${'Copy Account Dragon Ball ' + $route.query.copy}`
    "
    goBack
    next-page
    reload
    @reload="!isQueryCopy ? $refs.form.resetForm() : $refs.form.fetchData()"
  >
    <template #body>
      <div id="body-admin" class="mt-2">
        <AdminBaseForm
          ref="form"
          module="admin/game/dragonBalls"
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
  name: "NewAccountDragonBall",
};
</script>
<style lang="scss" scoped></style>
