<template>
  <NavAdmin
    title="Update Topic"
    goBack
    next-page
    reload
    @reload="$refs.form.fetchData()"
  >
    <template #body>
      <div id="body-admin">
        <AdminBaseForm
          ref="form"
          module="admin/topics"
          repository="adminTopics"
          :id="$route.params.id"
          :store="{
            state: 'queryTopic',
            module: 'admin.topics',
            form: 'formTopic',
            action: 'fetchTopic',
            update: 'updateTopic',
            delete: 'destroyTopic',
            unDelete: 'unDestroyTopic',
          }"
          :multipleImages="false"
        ></AdminBaseForm>
      </div>
    </template>
  </NavAdmin>
</template>

<script>
import NavAdmin from "@/components/pages/admin/layout/NavAdmin";
import AdminBaseForm from "@/components/pages/admin/base/AdminBaseForm";

export default {
  components: { NavAdmin, AdminBaseForm },
  layout: "adminDev",
  name: "EditTopic",
  props: {},
  computed: {},
  async mounted() {},
  methods: {},
};
</script>
