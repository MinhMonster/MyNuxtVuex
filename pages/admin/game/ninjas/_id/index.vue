<template>
  <NavAdmin
    title="Update Account Ninja"
    goBack
    next-page
    reload
    @reload="$refs.form.fetchData()"
    copy
    @copy="$router.push(`/admin/game/ninjas/new?copy=${$route.params.id}`)"
  >
    <template #body>
      <div id="body-admin">
        <AdminBaseForm
          ref="form"
          module="admin/game/ninjas"
          :repositories="repositories"
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
import { mapState } from "vuex";
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
  computed: {
    ...mapState("admin/mms", ["repositories"]),
  },
  methods: {},
};
</script>
<style >
</style>
