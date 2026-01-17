<template>
  <NavAdmin
    title="Settings"
    goBack
    next-page
    reload
    @reload="$refs.form.fetchData()"
  >
    <template #body>
      <div id="body-admin">
        <AdminBaseForm
          ref="form"
          module="admin/settings"
          repository="adminSettings"
          :repositories="repositories"
          id="1"
          :store="{
            state: 'queryNotification',
            module: 'admin.settings',
            form: 'formNotification',
            action: 'fetchNotification',
            update: 'updateNotification',
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
  name: "UpdateNotification",
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
