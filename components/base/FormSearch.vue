<template>
  <div v-if="active" class="form-search page-body mb-4 mgl--2px mgr--2px">
    <form @submit.prevent="search()">
      <v-row>
        <v-col
          v-for="(item, key) in querySearch"
          :cols="item.cols || 6"
          :sm="item.sm || 4"
          :md="item.md || 4"
          :lg="item.lg || 2"
          :key="key"
          v-show="item.show"
        >
          <div class="field group-btn-input flex">
            <div v-if="item.type === 'text'" class="group-btn-input flex">
              <v-btn v-if="!item?.hiddenTitle" color="white" class="w-20">
                <label for="id" class="w-100">{{item.title}}:</label>
              </v-btn>
              <v-text-field
                v-model="item.value"
                @change="changeData"
                density="compact"
                :placeholder="item.placeholder"
                variant="outlined"
                clearable
              />
            </div>
            <v-text-field
              v-if="item.type === 'date'"
              type="date"
              v-model="item.value"
              @change="changeData"
              density="compact"
              :label="item.title"
              :placeholder="item.placeholder"
              clearable
              class="input-date"
              variant="outlined"
            />
            <v-select
              v-if="item.type === 'select' || item.type === 'range'"
              v-model="item.value"
              density="compact"
              :label="item.title"
              :placeholder="item.placeholder"
              :items="item.options"
              clearable
              @change="changeData"
            />
          </div>
        </v-col>
        <GroupBtnSearch @search="search()" @reset="reset()" :hiddenReset="hiddenReset" />
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
    hiddenReset: {
      type: Boolean,
      default: false
    }
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
      await this.search();
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
