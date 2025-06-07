<template>
  <NavAdmin title="Mimi Food" goBack next-page>
    <template #body>
      <v-row>
        <v-col cols="12" md="12" sm="12">
          <AdminBaseTable
            ref="table"
            noTotal
            module="admin/mms"
            repository="mms"
            repositories="repositories"
            :columns="columns"
            :store="{
              state: 'querymmss',
              module: 'admin.mms',
              // action: 'adminFetchTopics',
            }"
          >
            <template #name="props">
              <nuxt-link :to="`/admin/mms/${props.row.link}`">{{
                props.row.name
              }}</nuxt-link>
            </template>
            <template #is_default="props">
              <BaseCheckBox
                :value="props.row.is_default"
                @change="(value) => onchange(value, props.row.ID)"
              >
              </BaseCheckBox>
            </template>
          </AdminBaseTable>
        </v-col>
      </v-row>
    </template>
  </NavAdmin>
</template>

<script>
import NavAdmin from "@/components/pages/admin/layout/NavAdmin";
import AdminBaseTable from "@/components/pages/admin/base/AdminBaseTable";
import { mapActions, mapState } from "vuex";
import Pagination from "@/components/global/molecules/common/Pagination";

export default {
  layout: "adminDev",
  components: {
    NavAdmin,
    AdminBaseTable,
    Pagination,
  },
  data() {
    return {
      ready: true,
      columns: [
        {
          key: "name",
          label: "Danh mục",
          attributes: {
            style: {
              minWidth: "300px",
            },
          },
        },
      ],
    };
  },
  computed: {
    ...mapState("admin/topics", ["repositories", "topics", "metaTopics"]),
    queryPage() {
      return _.cloneDeep(this.$route.query.page) || 1;
    },
  },
  mounted() {},
  methods: {},
};
</script>
