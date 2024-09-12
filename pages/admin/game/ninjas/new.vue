<template>
  <NavAdmin
    title="New Account Ninja School"
    goBack
    next-page
    reload
    @reload="$refs.form.resetForm()"
  >
    <template #body>
      <div id="body-admin" class="mt-2">
        <AdminBaseForm
          ref="form"
          module="admin/game/ninjas"
          repository="adminGameNinjas"
          :store="{
            state: 'queryNinja',
            module: 'admin.game.ninjas',
            form: 'formNinja',
            create: 'createAccountNinja',
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
  name: "NewAccountNinja",
  props: {},
  data() {
    return {};
  },
  methods: {},
};
</script>
<style lang="scss" scoped>
</style>
