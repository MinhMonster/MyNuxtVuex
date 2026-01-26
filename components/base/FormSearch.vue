<template>
  <div v-if="active" class="form-search page-body mb-4 mgl--2px mgr--2px">
    <form @submit.prevent="search()">
      <v-row>
        <v-col
          v-for="(item, key) in querySearch"
          cols="6"
          sm="4"
          md="4"
          lg="2"
          :key="key"
          v-show="item.show"
        >
          <div class="field">
            <v-text-field
              v-if="item.type === 'text'"
              v-model="item.value"
              @change="changeData"
              density="compact"
              :label="item.title"
              :placeholder="item.placeholder"
              variant="outlined"
            ></v-text-field>
            <v-text-field
              v-if="item.type === 'date'"
              type="date"
              v-model="item.value"
              @change="changeData"
              density="compact"
              :label="item.title"
              :placeholder="item.placeholder"
              class="input-date"
              variant="outlined"
            ></v-text-field>
            <v-select
              v-if="item.type === 'select' || item.type === 'range'"
              v-model="item.value"
              density="compact"
              :label="item.title"
              :placeholder="item.placeholder"
              :items="item.options"
              @change="changeData"
            ></v-select>
          </div>
        </v-col>
        <GroupBtnSearch @search="search()" @reset="reset()" />
      </v-row>
    </form>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
import clientCrud from "@/mixins/clientCrud";
import GroupBtnSearch from "@/components/common/client/button/GroupBtnSearch";

export default {
  mixins: [clientCrud],
  components: { GroupBtnSearch },
  props: {
    module: {
      type: String,
      default: "",
      require: false,
    },
  },
  data() {
    return {
      show: true,
      searched: true,
    };
  },
  methods: {
    async changeData() {
      await this.storeDispatch("setQuery", {
        stateName: this.storeQueryItems,
        data: this.querySearch,
      });
      await this.search();
      this.searched = false;
    },
    ...mapActions({}),
    async reset() {
      await this.resetQueryItems();
      this.search();
    },
    async search() {
      await this.storeDispatch("clearResponse", this.storeQueryItems);
      await this.resetDataPage();
      this.$emit("search");
      this.$nextTick(() => {
        this.searched = true;
      });
    },
  },
  unmounted() {
    if (!this.searched) {
      this.resetQueryItems();
    }
  },
  computed: {
    active() {
      //@ts-ignore
      return (
        Object.values(this.querySearch).filter((item) => {
          return item ? item.show : false;
        }).length != 0
      );
    },
    ...mapState({
      querySearch() {
        return _.cloneDeep(this.stateQueryItems);
      },
    }),
  },
};
</script>
