<template>
  <NavAdmin
    title="New Account Avatar"
    goBack
    next-page
    reload
    @reload="$refs.form.resetForm()"
  >
    <template #body>
      <div id="body-admin" class="mt-2">
        <AdminBaseForm
          ref="form"
          module="admin/game/avatars"
          repository="adminGameAvatars"
          :store="{
            state: 'queryAvatar',
            module: 'admin.game.avatars',
            form: 'formAvatar',
            create: 'createAccountAvatar',
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
  name: "NewAccountAvatar",
  props: {},
  data() {
    return {};
  },
  methods: {},
};
</script>
<style lang="scss" scoped>
</style>
