<template>
  <div class="form-search mb-3">
    <div class="page-body">
      <form @submit.prevent="search">
        <v-row>
          <v-col cols="6" sm="4" md="2" lg="2">
            <v-select
              v-model="cash"
              :items="cashOptions"
              @change="onChange()"
              size="sm"
            ></v-select>
          </v-col>
          <v-col cols="6" sm="4" md="2" lg="2">
            <v-select
              v-model="accountClass"
              :items="classOptions"
              @change="onChange()"
              size="sm"
            ></v-select>
          </v-col>
          <v-col cols="6" sm="4" md="2" lg="2">
            <v-select
              v-model="server"
              :items="serverOptions"
              @change="onChange()"
              size="sm"
            ></v-select>
          </v-col>
          <v-col cols="6" sm="4" md="2" lg="2">
            <v-text-field
              v-model="code"
              type="number"
              placeholder="Nhập Mã nick..."
              @change="onChange()"
              @keyup.enter="search()"
            ></v-text-field>
          </v-col>
          <GroupBtnSearch @search="search" @reset="reset" />
        </v-row>
      </form>
    </div>
  </div>
</template>

<script>
import GroupBtnSearch from "@/components/common/client/button/GroupBtnSearch";
import dragon_balls from "@/mixins/dragon_balls";

import {
  cashOptions,
  classOptions,
  serverOptions,
} from "@/utils/queryDragonBallOptions";
export default {
  mixins: [dragon_balls],
  components: { GroupBtnSearch },
  data() {
    return {
      classOptions,
      cashOptions,
      serverOptions,
    };
  },
  methods: {
    onChange() {
      this.$nextTick(() => {
        this.search();
      });
    },
  },
};
</script>
