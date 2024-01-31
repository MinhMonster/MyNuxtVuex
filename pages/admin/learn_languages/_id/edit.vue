<template>
  <NavAdmin
    :title="languageWordsInfo ? languageWordsInfo.title : null"
    goBack
    :path-go-back="`/admin/learn_languages/${languageWordsInfo.level_1}`"
    next-page
    new-page
    btn-edit
    @newPage="showModalCreateNewWord()"
    @edit="showModalUpdateTopic()"
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
              state: 'queryLanguageWords',
              module: 'admin.learn_languages',
              action: 'fetchLanguageWords',
            }"
          >
            <template #words="props">
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
                <v-icon>mdi-open-in-new</v-icon>
              </v-btn>
            </template>
          </AdminBaseTable>
        </v-col>
      </v-row>
      <FormModal
        ref="modal"
        :title="wordName"
        :id="languageWord.ID"
        width="800px"
        minHeight="65vh"
        module="admin/learn_languages"
        repository="adminLearnLanguages"
        isShow
        :store="{
          state: 'languageWord',
          module: 'admin.learn_languages',
          form: 'formLanguageWord',
          update: 'updateLanguageWord',
        }"
        @updated="$refs.table.fetchData()"
      >
        <template #show>
          <div class="language-word">
            <p><span class="title">Word:</span> {{ languageWord.word }}</p>
            <p><span class="title">Spell:</span> {{ languageWord.spell }}</p>
            <p>
              <span class="title">Translate:</span> {{ languageWord.translate }}
            </p>
            <p>
              <span class="title">Description:</span>
              <span v-html="languageWord.description"> </span>
            </p>

            <BaseTable
              v-if="languageExamples.data.length"
              :columns="exampleColumns"
              :data="languageExamples.data"
              :meta="{}"
            >
              <template #example="props">
                <div class="mb-2">
                  <div>
                    <span class="title">Ex:</span> {{ props.row.example }}
                  </div>
                  <div v-if="props.row.translate">
                    <span class="title">Translate:</span>
                    {{ props.row.translate }}
                  </div>
                  <div v-if="props.row.spell">
                    <span class="title">Translate:</span>
                    {{ props.row.translate }}
                  </div>
                  <div v-if="props.row.description">
                    <!-- <span class="title">Description:</span> -->
                    <span v-html="props.row.description"> </span>
                  </div>
                </div>
              </template>
              <template #actions="props">
              <v-btn light icon @click="showModalUpdateExample(props.row)">
                <v-icon>mdi-pen</v-icon>
              </v-btn>
            </template>
            </BaseTable>
          </div>
        </template>
        <template #btn-footer>
          <div
            @click="$refs.modalCreateExample.show()"
            class="text-right left ml-1"
          >
            <v-btn color="primary">
              <v-icon> mdi-plus </v-icon>
            </v-btn>
          </div>
        </template>
      </FormModal>
      <FormModal
        ref="modalCreateNewWord"
        title="Create New Word"
        :id="languageWordsInfo.ID"
        width="800px"
        minHeight="65vh"
        module="admin/learn_languages"
        repository="adminLearnLanguages"
        reset
        :store="{
          state: 'languageWord',
          module: 'admin.learn_languages',
          form: 'formLanguageWord',
          update: 'createLanguageWord',
        }"
        @updated="$refs.table.fetchData()"
      />
      <FormModal
        ref="modalUpdateTopic"
        title="Edit Language Topic"
        :id="languageWordsInfo.ID"
        reset
        width="800px"
        minHeight="150px"
        module="admin/learn_languages"
        repository="adminLearnLanguages"
        :store="{
          state: 'languageTopic',
          module: 'admin.learn_languages',
          form: 'formLanguageTopic',
          update: 'updateLanguageTopic',
        }"
        @updated="$refs.table.fetchData()"
      />
      <FormModal
        ref="modalCreateExample"
        title="Create Example"
        :id="languageWord.ID"
        reset
        width="600px"
        minHeight="150px"
        module="admin/learn_languages"
        repository="adminLearnLanguages"
        :store="{
          state: 'languageExample',
          module: 'admin.learn_languages',
          form: 'formLanguageExample',
          update: 'createLanguageExample',
        }"
        @updated="fetchLanguageExamples(languageWord.ID)"
      />
      <FormModal
        ref="modalUpdateExample"
        title="Update Example"
        :id="languageExample.ID"
        reset
        width="600px"
        minHeight="150px"
        module="admin/learn_languages"
        repository="adminLearnLanguages"
        :store="{
          state: 'languageExample',
          module: 'admin.learn_languages',
          form: 'formLanguageExample',
          update: 'updateLanguageExample',
        }"
        @updated="fetchLanguageExamples(languageWord.ID)"
      />
    </template>
  </NavAdmin>
</template>

<script>
import API from "@/apis/modules/admin/topics";
import api_file from "@/apis/modules/admin/files";
import { mapActions, mapState } from "vuex";
import NavAdmin from "@/components/pages/admin/layout/NavAdmin";
import AdminBaseTable from "@/components/pages/admin/base/AdminBaseTable";
import FormModal from "@/components/pages/admin/base/modal/FormModal";
import BaseTable from "@/components/base/BaseTable";

import LearnLanguageForm from "@/components/pages/admin/learn_languages/form/LearnLanguageForm.vue";
import CodeForm from "@/components/pages/admin/deverlopers/form/CodeForm.vue";
import AddActionBtnGroups from "@/components/pages/admin/deverlopers/AddActionBtnGroups.vue";
import { mapFields } from "vuex-map-fields";
import { cloneDeep } from "lodash";

export default {
  components: {
    LearnLanguageForm,
    CodeForm,
    AddActionBtnGroups,
    NavAdmin,
    AdminBaseTable,
    FormModal,
    BaseTable,
  },
  layout: "adminDev",
  name: "EditDeverloper",
  props: {},
  data() {
    return {
      wordName: "",
      ID: "",
      titel: "Admin: Edit Deverloper - ",
      languageExamples: {
        data: [],
        meta: {},
      },
      columns: [
        {
          key: "word",
          label: "Words",
          attributes: {
            style: {
              width: "auto",
              "min-width": "150px",
            },
          },
        },
        {
          key: "translate",
          label: "Translate",
          attributes: {
            style: {
              width: "auto",
              "min-width": "200px",
            },
          },
        },
        {
          key: "spell",
          label: "Spell",
          attributes: {
            style: {
              width: "auto",
              "min-width": "200px",
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
              width: "70px",
              "max-width": "70px",
            },
          },
        },
      ],
      exampleColumns: [
        {
          key: "example",
          label: "Example",
          attributes: {
            style: {
              width: "auto",
              "min-width": "150px",
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
              width: "70px",
              "max-width": "70px",
            },
          },
        },
      ],
    };
  },
  async mounted() {},
  computed: {
    ...mapFields("admin/learn_languages", [
      "deverloper",
      "deverloper_edit",
      "actions",
      "languageWord",
      'languageExample',
      "languageTopic",
      "queryLanguageWords",
    ]),

    routeId() {
      return this.$route.params.id;
    },
    // queryType() {
    //   return this.$route.query.type;
    // },
    languageWordsInfo() {
      return _.get(this.queryLanguageWords, "response.infos", "");
    },
  },
  methods: {
    ...mapActions("admin/learn_languages", [
      "get_deverloper_edit",
      "removeAction",
    ]),
    async showModal(row) {
      this.$refs.modal.show();
      this.wordName = row.word;
      this.languageWord = row;
      this.fetchLanguageExamples(row.ID);
    },
    async fetchLanguageExamples(ID) {
      const res =
        await this.$repositories.adminLearnLanguages.fetchLanguageExamples({
          input: {
            id: ID,
          },
        });
      this.languageExamples = _.get(res, "data.response", {
        data: [],
        meta: {},
      });
    },
    
    showModalUpdateExample(row) {
      this.$refs.modalUpdateExample.show();
      this.languageExample = row;

    },
    showModalCreateNewWord() {
      this.$refs.modalCreateNewWord.show();
    },
    showModalUpdateTopic() {
      this.$refs.modalUpdateTopic.show();
      this.languageTopic = this.languageWordsInfo;
    },
    async show(ID) {
      const res = await API.showEdit({
        params: {
          id: ID,
        },
      });
      this.topic = res.data.topic;
    },
    async edit() {
      const formData = new FormData();
      formData.append("id", this.deverloper_item.ID);
      formData.append("title", this.deverloper_item.title);
      formData.append("link", this.deverloper_item.link);
      formData.append("info", this.deverloper_item.info);
      formData.append("content", this.deverloper_item.content);
      formData.append("html_code", this.deverloper_item.html_code);
      formData.append("css_code", this.deverloper_item.css_code);
      formData.append("javascript_code", this.deverloper_item.javascript_code);

      const codeValue = JSON.stringify(this.actions);
      formData.append("code", codeValue);

      try {
        const res = await this.$repositories.adminDeverlopers.edit(formData);
        if (res.data.code === 200) {
          this.$toasted.success(res.data.message);
        }
      } catch (e) {
        console.log(e);
      }
    },

    async onDelete() {
      this.$swal
        .fire({
          title: `Bạn muốn xóa ID: ${this.routeId} <br/> Title: ${this.deverloper_item.title}?`,
          text: "",
          icon: "question",
          type: "warning",
          showDenyButton: false,
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Xóa",
          cancelButtonText: "Hủy",
          timer: 5000,
          // closeOnConfirm: false,
          // closeOnCancel: false
        })
        .then(async (result) => {
          if (result.isConfirmed) {
            const formData = new FormData();
            formData.append("id", this.routeId);
            try {
              const res = await this.$repositories.adminDeverlopers.delete({
                params: {
                  id: this.routeId,
                },
              });
              if (res.data.code === 200) {
                this.$toasted.success(res.data.message);

                if (this.routeId === this.deverloper.ID) {
                  this.$router.push(`/admin/deverlopers`);
                } else {
                  this.$router.push(
                    `/admin/deverlopers/${this.deverloper.ID}/show`
                  );
                }
              }
            } catch (e) {
              console.log(e);
            }
          }
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.CodeMirror {
  height: auto;
  min-height: 50px;
  resize: horizontal;
}

.CodeMirror-wrap pre {
  word-break: break-word;
}

/* #body-admin {
  position: relative;
} */
/* .btn-groups {
  position: fixed;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: 9;
  height: 50px;

} */
</style>
