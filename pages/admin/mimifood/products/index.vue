<template>
  <NavAdmin
    title="Products"
    goBack
    next-page
    new-page
    @newPage="$router.push('/admin/mimifood/products/new')"
    filter
    reload
    @reload="$refs.table.fetchData()"
  >
    <template #body>
      <v-row>
        <v-col cols="12" md="12" sm="12">
          <AdminBaseTable
            ref="table"
            module="admin/mimifood/products"
            repository="mimiFoodProducts"
            :repositories="repositories"
            :columns="columns"
            :store="{
              state: 'queryProducts',
              module: 'admin.mimifood.products',
              action: 'adminFetchProducts',
            }"
          >
            <template #name="props">
              <nuxt-link :to="`/admin/mimifood/products/${props.row.id}`">{{
                props.row.name
              }}</nuxt-link>
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
import { mapState } from "vuex";

export default {
  layout: "adminDev",
  components: {
    NavAdmin,
    AdminBaseTable,
  },
  data() {
    return {
      ready: true,
      columns: [
        {
          key: "id",
          label: "ID",
          attributes: {
            style: {
              width: "50px !important",
              minWidth: "50px !important",
            },
          },
        },
        {
          key: "name",
          label: "Name",
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
          key: "created_at",
          label: "Created At",
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
    ...mapState("admin/mimifood", ["repositories"]),
    queryPage() {
      return _.cloneDeep(this.$route.query.page) || 1;
    },
  },
  mounted() {},
  methods: {},
};
</script>
