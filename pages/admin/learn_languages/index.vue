<template>
  <NavAdmin
    title="Learn Languages"
    goBack
    next-page
    new-page
    filter
    @newPage="$router.push('/admin/learn_languages/new')"
    reload
    @reload="$refs.table.fetchData()"
  >
    <template #body>
      <v-row>
        <v-col cols="12" md="12" sm="12">
          <AdminBaseTable
            noTotal
            ref="table"
            module="admin/learn_languages"
            repository="adminLearnLanguages"
            :columns="columns"
            :store="{
              state: 'queryLearnLanguages',
              module: 'admin.learn_languages',
              action: 'fetchLearnLanguages',
            }"
          >
            <template #title="props">
              <nuxt-link :to="`/admin/learn_languages/${props.row.ID}`">{{
                props.row.title
              }}</nuxt-link>
            </template>
            <template #actions="props">
              <v-btn light icon @click="showModal(props.row)">
                <v-icon>mdi-pen</v-icon>
              </v-btn>
            </template>
          </AdminBaseTable>
        </v-col>
      </v-row>
      <FormModal
        ref="modal"
        :title="languageTitle"
        :id="language.ID"
        width="500px"
        minHeight="150px"
        module="admin/learn_languages"
        repository="adminLearnLanguages"
        :store="{
          state: 'language',
          module: 'admin.learn_languages',
          form: 'formUpdateLanguage',
          // action: 'fetchGameAccountSold',
          update: 'updateLanguage',
        }"
        @updated="$refs.table.fetchData()"
      />
    </template>
  </NavAdmin>
</template>

<script>
import { mapFields } from "vuex-map-fields";
import draggable from "vuedraggable";
import NavAdmin from "@/components/pages/admin/layout/NavAdmin";
import AdminBaseTable from "@/components/pages/admin/base/AdminBaseTable";
import FormModal from "@/components/pages/admin/base/modal/FormModal";

export default {
  layout: "adminDev",
  components: {
    draggable,
    NavAdmin,
    AdminBaseTable,
    FormModal,
  },

  data() {
    return {
      languageTitle: "",
      columns: [
        // {
        //   key: "ID",
        //   label: "ID",
        //   type: "number",
        //   attributes: {
        //     align: "center",

        //     style: {
        //       width: "120px",
        //     },
        //   },
        // },
        {
          key: "title",
          label: "Language",
          attributes: {
            style: {
              width: "auto",
            },
          },
        },
        {
          key: "actions",
          label: "Actions",
          type: "actions",
          attributes: {
            align: "center",
            style: {
              width: "60px",
            },
          },
        },
      ],
    };
  },
  name: "LearnLanguages",
  async mounted() {},
  computed: {
    ...mapFields("admin/learn_languages", ["queryLearnLanguage", "language"]),
  },
  methods: {
    showModal(row) {
      this.$refs.modal.dialog = true;
      this.languageTitle = row.title;
      this.language = row;
    },
  },
};
</script>
<style>
</style>
