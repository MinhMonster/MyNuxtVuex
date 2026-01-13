<template>
  <NavAdmin
    :title="
      paramsId
        ? title
        : !isQueryCopy
        ? `New ${title}`
        : `Copy ${title + ' ' + $route.query.copy}`
    "
    goBack
    next-page
    reload
    @reload="
      isQueryCopy || paramsId ? $refs.form.fetchData() : $refs.form.resetForm()
    "
    :copy="isCanCopy"
    @copy="$router.push(path.replace(/\/\d+$/, '') + `/new?copy=${paramsId}`)"
  >
    <template #body>
      <div id="body-admin" class="mt-2">
        <AdminBaseForm
          ref="form"
          :id="paramsId"
          :module="module"
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
  props: {
    title: {
      type: String,
      default: "Modify",
      require: true,
    },
    module: {
      type: String,
      require: true,
    },
    isCanCopy: Boolean,
  },
  computed: {
    paramsId() {
      return this.$route.params.id;
    },
  },
};
</script>
