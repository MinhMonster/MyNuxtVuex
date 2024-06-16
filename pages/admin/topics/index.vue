<template>
  <NavAdmin
    title="Topics"
    goBack
    next-page
    new-page
    @newPage="$router.push('/admin/topics/new')"
    reload
    @reload="$refs.table.fetchData()"
  >
    <template #body>
      <v-row>
        <v-col cols="12" md="12" sm="12">
          <AdminBaseTable
            ref="table"
            module="admin/topics"
            repository="adminTopics"
            :columns="columns"
            :store="{
              state: 'queryTopics',
              module: 'admin.topics',
              action: 'fetchTopics',
            }"
          >
            <template #actions="props">
              <v-btn light icon :to="`/admin/topics/${props.row.ID}`">
                <v-icon>mdi-pencil-box-multiple-outline</v-icon>
              </v-btn>
            </template>
            <template #is_default="props">
              <BaseCheckBox
                :value="props.row.is_default"
                @change="(value) => onchange(value, props.row.ID)"
              ></BaseCheckBox>
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
          key: "ID",
          label: "ID",
          attributes: {
            style: {
              width: "50px !important",
              minWidth: "50px !important",
            },
          },
        },
        {
          key: "title",
          label: "Title",
          attributes: {
            style: {
              minWidth: "300px",
            },
          },
        },
        {
          key: "link",
          label: "Link",
          attributes: {
            style: {
              minWidth: "300px",
            },
          },
        },
        {
          key: "actions",
          label: "Actions",
          type: "actions",
          attributes: {
            minWidth: "120",
          },
        },
      ],
    };
  },
  computed: {
    ...mapState("admin/topics", ["topics", "metaTopics"]),
    queryPage() {
      return _.cloneDeep(this.$route.query.page) || 1;
    },
  },
  mounted() {},
  methods: {},
};
</script>
