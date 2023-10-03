import { mapFields } from "vuex-map-fields";
import mixins from "@/mixins/index";

export default {
  mixins: [mixins],

  data() {
    return {
    }
  },
  computed: {
    ...mapFields("global", {
      isFilter: "isFilter",
    }),
  },
  methods: {
    columnsValue(type, value) {
      // return value

      switch (type) {
        case 'number':
          return this.format_number(value)
        case 'class-ninja':
          return this.classNinja(value)
        case 'server-ninja':
          return this.serverNinja(value)
        case 'type-ninja':
          return this.typeNinja(value)
        case 'status-ninja':
          return this.statusNinja(value)
      //   case 'USDT':
      //     return this.$options.filters.formatUSDT(value)
        default:
          return value
      }
    },
  },
}
