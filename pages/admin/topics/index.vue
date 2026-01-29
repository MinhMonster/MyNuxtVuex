<template>
  <AdminIndex
    ref="table"
    title="Topics"
    module="admin/topics"
    newPage
    isModify
    :actions="actions"
  />
</template>

<script>
import AdminIndex from "@/components/base/AdminIndex";
export default {
  layout: "adminDev",
  name: "Topics",
  components: { AdminIndex },
  data() {
    return {
      actions: [
        {
          type: "onDelete",
          label: "Ẩn/Hiện",
          icon: "mdi-delete",
          color: "red",
          danger: true,
        },
      ],
    };
  },
};
</script>
<style></style>
