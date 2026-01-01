<template>
  <NavAdmin
    title="Notification"
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
  computed: {},
  methods: {},
};
</script>
<style >
</style>
