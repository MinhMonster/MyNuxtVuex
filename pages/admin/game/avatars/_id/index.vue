<template>
  <AdminModify
    title="Update Account Avatar"
    module="admin/game/avatars"
    isCanCopy
  />
</template>

<script>
import AdminModify from "@/components/base/AdminModify";

export default {
  layout: "adminDev",
  name: "UpdateAccounAvatar",
  components: { AdminModify },
};
</script>
