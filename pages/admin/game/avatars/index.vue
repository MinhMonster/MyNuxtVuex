<template>
  <AdminIndex
    ref="table"
    title="Game Avatars"
    module="admin/game/avatars"
    newPage
    isModify
  >
    <template #actions="props">
      <v-btn light icon @click="$refs.table.showModal(props.row)">
        <v-icon size="20" class="text-info">mdi-cash-edit</v-icon>
      </v-btn>
    </template>
  </AdminIndex>
</template>

<script>
import AdminIndex from "@/components/base/AdminIndex";
export default {
  layout: "adminDev",
  name: "Avatars",
  components: { AdminIndex },
};
</script>
<style></style>
