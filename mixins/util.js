import { mapFields } from "vuex-map-fields";

export default {

  data() {
    return {
    }
  },
  computed: {
    ...mapFields("global", {
      isFilter: "isFilter",
    }),
    path() {
      return this.$route.path
    }
  },

  methods: {
    columnsValue(column = {}, value) {
      const { type, prefix = '' } = column
      let newValue = value

      switch (type) {
        case 'number':
          newValue = this.format_number(value)
          break
        case 'class-ninja':
          newValue = this.classNinja(value)
          break
        case 'server-ninja':
          newValue = this.serverNinja(value)
          break
        case 'type-ninja':
          newValue = this.typeNinja(value)
          break
        case 'game-name':
          newValue = this.game_name(value)
          break
      }

      return prefix + newValue
    }
  },
}
