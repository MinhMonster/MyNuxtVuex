<template>
  <NavAdmin
    :title="
      !isCopy
        ? 'New Account Ninja School'
        : `${'Copy Account Ninja School ' + $route.query.copy}`
    "
    goBack
    next-page
    reload
    @reload="!isCopy ? $refs.form.resetForm() : $refs.form.fetchData()"
  >
    <template #body>
      <div id="body-admin" class="mt-2">
        <AdminBaseForm
          ref="form"
          module="admin/game/ninjas"
          :repositories="repositories"
          repository="adminGameNinjas"
          :id="isCopy ? $route.query.copy : null"
          :store="{
            state: 'queryNinja',
            module: 'admin.game.ninjas',
            form: 'formNinja',
            action: 'fetchAccountNinja',
            create: 'createAccountNinja',
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
  name: "NewAccountNinja",
  props: {},
  data() {
    return {
      isCopy: false,
    };
  },
  computed: {
    ...mapState("admin/mms", ["repositories"]),
  },
  async created() {
    const query = this.$route.query;
    if (query.copy) {
      this.isCopy = true;
    }
  },
  methods: {},
};
</script>
<style lang="scss" scoped>
</style>
