<template>
  <NavAdmin
    :title="languageInfo ? languageInfo.title : null"
    goBack
    next-page
    new-page
    filter
    @newPage="showModalAddNew()"
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
            :params="[{ query: 'id', value: $route.params.id }]"
            :store="{
              state: 'queryLearnLanguage',
              module: 'admin.learn_languages',
              action: 'fetchLearnLanguage',
            }"
          >
            <template #items="props">
              <ul>
                <li class="bold">{{ props.row.title }}</li>
                <li v-for="info in props.row.items" :key="info.ID">
                  <nuxt-link :to="`/admin/learn_languages/${info.ID}/edit`">{{
                    info.title
                  }}</nuxt-link>
                </li>
              </ul>
            </template>
            <template #actions="props">
              <v-btn light icon @click="showModal(props.row)">
                <v-icon>mdi-pen</v-icon>
              </v-btn>
              <v-btn light icon @click="showModalAddNewTopic(props.row)">
                  <v-icon>mdi-plus</v-icon>
                </v-btn>
            </template>
          </AdminBaseTable>
        </v-col>
      </v-row>
      <FormModal
        ref="modal"
        :title="languageItemTitle"
        :id="languageItem.ID"
        width="500px"
        minHeight="150px"
        module="admin/learn_languages"
        repository="adminLearnLanguages"
        :store="{
          state: 'languageItem',
          module: 'admin.learn_languages',
          form: 'formUpdateLanguageItem',
          // action: 'fetchGameAccountSold',
          update: 'updateLanguageItem',
        }"
        @updated="$refs.table.fetchData()"
      />
      <FormModal
        ref="addNew"
        title="New Category"
        :id="languageInfo.ID"
        width="500px"
        minHeight="150px"
        module="admin/learn_languages"
        repository="adminLearnLanguages"
        :store="{
          state: 'languageItem',
          module: 'admin.learn_languages',
          form: 'formLanguageCategory',
          update: 'createLanguageCategory',
        }"
        @updated="$refs.table.fetchData()"
      />
      <FormModal
        ref="addNewTopic"
        title="New Topic"
        :subTitle="languageItem.title"
        :id="languageItem.ID"
        reset
        width="800px"
        minHeight="150px"
        module="admin/learn_languages"
        repository="adminLearnLanguages"
        :store="{
          state: 'languageTopic',
          module: 'admin.learn_languages',
          form: 'formLanguageTopic',
          update: 'createLanguageTopic',
        }"
        @updated="$refs.table.fetchData()"
      />
    </template>
  </NavAdmin>
</template>

<script>
import { mapFields } from "vuex-map-fields";
import { mapActions, mapState } from "vuex";
import NavAdmin from "@/components/pages/admin/layout/NavAdmin";
import AdminBaseTable from "@/components/pages/admin/base/AdminBaseTable";
import FormModal from "@/components/pages/admin/base/modal/FormModal";

export default {
  layout: "adminDev",
  components: {
    NavAdmin,
    AdminBaseTable,
    FormModal,
  },
  name: "Deverlopers",
  data() {
    return {
      languageItemTitle: "",
      columns: [
        {
          key: "items",
          label: "Items",
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
              width: "100px",
              "text-align": "center !important",
            },
          },
        },
      ],
    };
  },
  async mounted() {
    console.log("this.queryLearnLanguage", this.queryLearnLanguage);
  },
  computed: {
    ...mapFields("admin/learn_languages", [
      "queryLearnLanguage",
      "languageItem",
    ]),
    languageInfo() {
      return _.get(this.queryLearnLanguage, "response.infos", "");
    },
  },
  methods: {
    ...mapActions("admin/deverlopers", ["", "get_deverloper"]),
    showModal(row) {
      this.$refs.modal.dialog = true;
      this.languageItemTitle = row.title;
      this.languageItem = row;
    },
    showModalAddNewTopic(row){
      this.$refs.addNewTopic.show();
      this.languageItemTitle = row.title;
      this.languageItem = row;
    },
    showModalAddNew() {
      this.$refs.addNew.dialog = true;
      this.languageItemTitle = "";
      this.languageItem = {};
    },
  },
};
</script>
<style>
#admin td ul li {
  padding: 10px 0;
}
#admin .v-data-table > .v-data-table__wrapper > table > tbody > tr > td {
  padding-top: 5px !important ;
  vertical-align: top !important;
}
</style>