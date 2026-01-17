<template>
  <AdminModify
    title="Update Account Ninja"
    module="admin/game/ninjas"
    isCanCopy
  />
</template>

<script>
import AdminModify from "@/components/base/AdminModify";

export default {
  layout: "adminDev",
  name: "UpdateAccountNinja",
  components: { AdminModify },
};
</script>
