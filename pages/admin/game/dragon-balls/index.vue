<template>
  <AdminIndex
    ref="table"
    title="Game DragonBalls"
    module="admin/game/dragonBalls"
    newPage
    isModify
    :actions="actions"
    :modal-configs="modalConfigs"
  />
</template>

<script>
import AdminIndex from "@/components/base/AdminIndex";
import {
  accountGameActions,
  accountGameModalConfigs,
} from "@/utils/admin/actionConfigs";
export default {
  layout: "adminDev",
  name: "DragonBalls",
  components: { AdminIndex },
  data() {
    return {
      actions: accountGameActions(),
      modalConfigs: accountGameModalConfigs(),
    };
  },
};
</script>
