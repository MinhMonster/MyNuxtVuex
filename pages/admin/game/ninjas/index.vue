<template>
  <AdminIndex
    ref="table"
    title="Game Ninjas"
    module="admin/game/ninjas"
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
  name: "Ninjas",
  components: { AdminIndex },
  data() {
    return {
      actions: accountGameActions(),
      modalConfigs: accountGameModalConfigs(),
    };
  },
};
</script>
