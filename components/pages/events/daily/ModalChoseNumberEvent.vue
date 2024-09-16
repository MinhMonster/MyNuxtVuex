<template>
  <v-dialog v-model="dialog" scrollable max-width="500px" light>
    <template v-slot:activator="{ on, attrs }">
      <div v-bind="attrs" v-on="on" class="">
        <div class="">
          <v-btn class="btn-main" style="width: 105px">
            <span>Chọn Số</span>
          </v-btn>
        </div>
      </div>
     <slot name="button"></slot>
    </template>

    <v-card>
      <v-btn class="close" color="red" icon @click="dialog = false">
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <v-card-title class="title-modal text-menu-main">
        Số bạn đã chọn:
        <span class="text-main ml-1">{{
          number != null && number >= 0 ? formatTwoNumber(number) : "??"
        }}</span>
      </v-card-title>
      <v-card-text style="height: 300px">
        <div class="base-dialog page-body">
          <div class="base-dialog-bg scroll-y list-number">
            <div
              v-for="n in range(100)"
              :key="n"
              class="number"
              @click="number = n"
            >
              <v-btn icon :class="{ active: number == n }">
                <v-icon>{{ formatTwoNumber(n) }}</v-icon>
              </v-btn>
            </div>
          </div>
        </div>
      </v-card-text>
      <v-card-actions>
        <div class="text-right right w-100">
          <v-btn
            color="primary"
            class="text-white"
            :disabled="number == null"
            @click="changeNumber()"
          >
            Lưu
          </v-btn>
          <v-btn color="red" class="text-white" @click="dialog = false">
            Đóng
          </v-btn>
        </div>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import mixins from "@/mixins/index";

export default {
  mixins: [mixins],

  data() {
    return {
      number: null,
      dialog: false,
    };
  },
  props: {
    value: {
      type: [String, Number],
      default: "",
    },
  },
  watch: {
    value: {
      async handler(newValue, oldValue) {
        if(this.value !== null && this.value.length > 2){
          this.number = null;
          this.$emit("change", this.number);
        } else  if (this.value !== null && this.value >= 0 && this.value <= 99) {
          this.number = this.value;
        } else {
          this.number = null;
          this.$emit("change", this.number);
        }
      },
    },
  },
  computed: {
  },

  methods: {
    range(n) {
      const arr = [];
      for (let i = 0; i < n; i++) {
        arr.push(i);
      }
      return arr;
    },
    async changeNumber() {
      this.$emit("change", this.number);
      this.dialog = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.v-application {
  .v-input--selection-controls {
    margin-top: 0px;

    ::v-deep {
      label {
        margin-bottom: 0px !important;
      }

      .main--text {
        color: #9f5424 !important;
        caret-color: #9f5424 !important;
      }
    }

    &.main--text {
      color: #561d00;
    }
  }
}

.list-number {
  display: flex;
  flex-wrap: wrap;

  .number {
    width: 20%;
    margin-bottom: 10px;

    .v-btn {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: #e28637;
      color: #ffcf9c;

      .v-icon {
        font-size: 20px;
      }

      &.active {
        background: #561d00;
      }
    }
  }
}
</style>
