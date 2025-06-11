<template>
  <NavAdmin
    :title="
      !isCopy
        ? 'New Account Avatar'
        : `${'Copy Account Avatar ' + $route.query.copy}`
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
          module="admin/game/avatars"
          :repositories="repositories"
          repository="adminGameAvatars"
          :id="isCopy ? $route.query.copy : null"
          :store="{
            state: 'queryAvatar',
            module: 'admin.game.avatars',
            form: 'formAvatar',
            action: 'fetchAccountAvatar',
            create: 'createAccountAvatar',
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
  name: "NewAccountAvatar",
  props: {},
  data() {
    return {
      isCopy: false,
    };
  },
  async created() {
    const query = this.$route.query;
    if (query.copy) {
      this.isCopy = true;
    }
  },
  computed: {
    ...mapState("admin/mms", ["repositories"]),
  },
  methods: {},
};
</script>
<style lang="scss" scoped></style>
