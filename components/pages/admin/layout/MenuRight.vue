<!-- <template>
  <v-navigation-drawer
    v-if="deverloper"
    style="
      top: 94px;
      min-height: calc(100% - 94px);
      height: calc(100% - 94px);
      width: 300px;
      direction: rtl;
      text-align: left;
    "
    v-model="showMenuRight"
    :right="right"
    :clipped="clipped"
    fixed
    app
  >
    <v-menu v-for="(text, index) in menuLeft.items" :key="index" offset-y>
      <template v-slot:activator="{ attrs }">
        <v-list class="" v-bind="attrs" style="direction: ltr">
          <v-list-item :to="`/admin/deverlopers/${text.ID}/show`">
            <v-list-item-content>
              <v-list-item-title class="menu-show">
                {{ text.title }}
              </v-list-item-title>
            </v-list-item-content>
            <v-slide-item v-if="checkedEdit">
              <v-btn icon :to="`/admin/deverlopers/${text.ID}/new`">
                <v-icon> mdi-plus</v-icon>
              </v-btn>
            </v-slide-item>
            <v-slide-item v-if="checkedEdit">
              <v-btn icon :to="`/admin/deverlopers/${text.ID}/edit`">
                <v-icon>mdi-pencil-box-multiple-outline</v-icon>
              </v-btn>
            </v-slide-item>
          </v-list-item>
          <draggable
            v-if="text.items"
            v-model="text.items"
            ghost-class="ghost"
            @change="changeByDrag"
            handle=".handle"
            tag="div"
          >
            <div v-for="item in text.items" :key="item.title">
              <v-list-item
                link
                :to="`/admin/deverlopers/${item.type}/${item.link}`"
                router
                exact
              >
                <v-list-item-content>
                  <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item-content>
                <v-slide-item v-if="checkedMove">
                  <v-btn icon>
                    <v-icon class="handle">mdi-cursor-move</v-icon>
                  </v-btn>
                </v-slide-item>
                <v-slide-item v-if="checkedEdit">
                  <v-btn icon :to="`/admin/deverlopers/${item.ID}/edit`">
                    <v-icon>mdi-pencil-box-multiple-outline</v-icon>
                  </v-btn>
                </v-slide-item>
              </v-list-item>
            </div>
          </draggable>
        </v-list>
      </template>
    </v-menu>
  </v-navigation-drawer>
</template>

<script>
import { mapFields } from "vuex-map-fields";
import { createNamespacedHelpers } from "vuex";
// import draggable from "vuedraggable";

const { mapState, mapActions } = createNamespacedHelpers("admin/deverlopers");

export default {
  name: "MenuRight",
  components: {
    draggable,
  },
  props: {
    // checkedMove: Boolean,
  },
  watch: {},
  data() {
    return {
      clipped: true,
      fixed: false,
      right: true,
    };
  },
  async mounted() {},
  destroyed() {},
  unMounted() {},
  computed: {
    ...mapFields("admin/layout", {
      showMenuRight: "showMenuRight",
      checkedEdit: "checkedEdit",
      checkedMove: "checkedMove",
    }),
    ...mapState(["deverlopers", "deverloper"]),
    menuLeft() {
      return _.cloneDeep(this.deverloper) || {};
    },
  },
  methods: {
    ...mapActions(["changePositionItemDev", "updateDeverloper"]),
    async changeByDrag(event) {
      this.updatePosition(
        event.moved.element.ID,
        event.moved.newIndex,
        event.moved.element.level_2
      );
      await this.updateDeverloper(this.menuLeft);
    },
    updatePosition(id, newIndex, level_2) {
      const formData = new FormData();
      formData.append("id", id);
      formData.append("newIndex", newIndex);
      formData.append("item", level_2);

      this.changePositionItemDev(formData);
    },
  },
};
</script> -->