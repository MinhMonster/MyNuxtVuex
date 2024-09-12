<template>
  <NavAdmin
    title="Update Account Ninja"
    goBack
    next-page
    reload
    @reload="$refs.form.fetchData()"
  >
    <template #body>
      <div id="body-admin">
        <AdminBaseForm
          ref="form"
          module="admin/game/ninjas"
          repository="adminGameNinjas"
          :id="$route.params.id"
          :store="{
            state: 'queryNinja',
            module: 'admin.game.ninjas',
            form: 'formNinja',
            action: 'fetchAccountNinja',
            update: 'updateAccountNinja',
            delete: 'destroyAccountNinja',
            unDelete: 'unDestroyAccountNinja',
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
</style>
