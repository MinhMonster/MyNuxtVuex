<template>
  <div class="form-search">
    <div class="page-body">
      <form @submit.prevent="search()">
        <v-row>
          <v-col cols="6" sm="3" md="3" lg="2">
            <div class="field v-input form-input">
              <select v-model="level" class="" @change="search">
                <option
                  v-for="(option, index) in levelOptions"
                  :key="index"
                  :value="option.value"
                >
                  {{ option.text }}
                </option>
              </select>
            </div>
          </v-col>
          <v-col cols="6" sm="3" md="3" lg="2">
            <div class="field v-input form-input">
              <select v-model="cash" class="" @change="search">
                <option
                  v-for="(option, index) in cashOptions"
                  :key="index"
                  :value="option.value"
                >
                  {{ option.text }}
                </option>
              </select>
            </div>
          </v-col>
          <v-col cols="6" sm="3" md="3" lg="2">
            <div class="field v-input form-input">
              <select v-model="server" class="" @change="search">
                <option
                  v-for="(server, sv) in serverOptions"
                  :key="sv"
                  :value="server.value"
                >
                  {{ server.text }}
                </option>
              </select>
            </div>
          </v-col>
          <v-col cols="6" sm="3" md="3" lg="2">
            <div class="field v-input form-input">
              <select v-model="classNinjas" class="" @change="search">
                <option
                  v-for="(option, index) in classOptions"
                  :key="index"
                  :value="option.value"
                >
                  {{ option.text }}
                </option>
              </select>
            </div>
          </v-col>

          <v-col cols="6" sm="3" md="3" lg="2">
            <div class="field group-btn-input flex">
              <v-btn color="white" class="w-20">
                <label for="id" class="w-100">Mã:</label>
              </v-btn>
              <input
                v-model="id"
                @change="search"
                id="id"
                type="number"
                placeholder="Mã số nick..."
                class="v-input form-input"
              />
            </div>
          </v-col>
          <v-col cols="6" sm="3" md="3" lg="2">
            <div class="field group-btn-input flex">
              <v-btn color="white" class="w-20">
                <label for="ingame" class="w-100">IG:</label>
              </v-btn>
              <input
                v-model="ingame"
                @change="search"
                id="ingame"
                type="text"
                placeholder="Tên nhân vật..."
                class="v-input form-input"
              />
            </div>
          </v-col>
          <GroupBtnSearch @search="search" @reset="$emit('reset')" />
        </v-row>
      </form>
    </div>
  </div>
</template>
<script>
import ninjas_mixins from "@/mixins/ninjas_mixins";
import Loading from "@/components/global/molecules/common/Loading";
import GroupBtnSearch from "@/components/common/client/button/GroupBtnSearch";

export default {
  mixins: [ninjas_mixins],
  components: { Loading, GroupBtnSearch },
  props: {
    type: {
      type: String,
      default: null,
    },
  },
};
</script>