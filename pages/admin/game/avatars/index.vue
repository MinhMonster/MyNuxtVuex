<template>
  <AdminIndex
    ref="table"
    title="Game Avatars"
    module="admin/game/avatars"
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
  name: "Avatars",
  components: { AdminIndex },
  data() {
    return {
      actions: accountGameActions(),
      modalConfigs: accountGameModalConfigs(),
    };
  },
};
</script>
<style></style>
