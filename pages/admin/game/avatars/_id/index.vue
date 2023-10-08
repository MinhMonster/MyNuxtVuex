<template>
  <NavAdmin
    title="Update Account Avatar"
    goBack
    next-page
    reload
    @reload="$refs.form.fetchData()"
  >
    <template #body>
      <div id="body-admin">
        <AdminBaseForm
          ref="form"
          module="admin/game/avatars"
          repository="adminGameAvatars"
          :id="$route.params.id"
          :store="{
            state: 'queryAvatar',
            module: 'admin.game.avatars',
            form: 'formAvatar',
            action: 'fetchAccountAvatar',
            update: 'updateAccountAvatar',
            delete: 'destroyAccountAvatar',
            unDelete: 'unDestroyAccountAvatar',
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
  name: "UpdateAccountNinja",
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
.CodeMirror {
  height: 500px;
  resize: horizontal;
}
.CodeMirror-wrap pre {
  word-break: break-word;
}
</style>
