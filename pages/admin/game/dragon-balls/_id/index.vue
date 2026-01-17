<template>
  <AdminModify
    title="Update Account Dragon Ball"
    module="admin/game/dragonBalls"
    isCanCopy
  />
</template>

<script>
import AdminModify from "@/components/base/AdminModify";

export default {
  layout: "adminDev",
  name: "UpdateAccountDragonBall",
  components: { AdminModify },
};
</script>
