<template>
  <AdminModify title="Update Discount" module="admin/discounts" isCanCopy />
</template>

<script>
import AdminModify from "@/components/base/AdminModify";

export default {
  layout: "adminDev",
  name: "UpdateDiscount",
  components: { AdminModify },
};
</script>
