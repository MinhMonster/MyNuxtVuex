<template>
  <AdminModify
    title="Topic"
    module="admin/topics"
    isCanCopy
  />
</template>

<script>
import AdminModify from "@/components/base/AdminModify";

export default {
  layout: "adminDev",
  name: "UpdateTopic",
  components: { AdminModify },
};
</script>
