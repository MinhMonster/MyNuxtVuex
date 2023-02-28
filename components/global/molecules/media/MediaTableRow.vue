<template>
  <tr>
    <td>{{ image.id }}</td>
    <td class="td-name">
      <div class="d-flex align-items-start" :title="image.fileName">
        <span
          class="mr-2 border d-flex align-items-end justify-content-end"
          :style="computedThumbnail"
        >
          <i
            v-if="image.contentType == 'video/mp4'"
            class="mdi mdi-motion-play-outline bg-secondary line-height-1 p-1 text-white"
          ></i>
        </span>
        <!-- <div v-if="editable" class="white-space-normal line-clamp-2">
          {{ image.fileName }}
        </div> -->
      </div>
    </td>
    <td class="td-size">
      {{ fileSizeFilter(image.byteSize) }}
    </td>
    <td class="td-time">
      {{ image.createdAt }}
    </td>
    <!-- <td v-if="editable" class="td-type">
      {{ image.contentType }}
    </td>
    
    <td v-if="editable" class="td-time">
      {{ image.createdAt | datetimeFilter }}
    </td> -->
    <td class="td-misc">
      <v-btn :href="image.url" icon router exact>
        <v-icon color="blue">mdi-eye </v-icon>
      </v-btn>
      <v-icon color="red" @click="dropImage(image)">mdi-delete</v-icon>
    </td>
  </tr>
</template>

<script>
import mixins from "@/mixins/index";

export default {
  mixins: [mixins],

  props: {
    image: {
      type: Object,
      default: () => {},
    },
    // inUseIds: {
    //   type: Array,
    //   default: () => [],
    // },
    // editable: Boolean,
    // selectable: Boolean,
    // selected: Boolean,
  },
  computed: {
    // inUsed() {
    //   return _.includes(this.inUseIds, this.image.id);
    // },
    computedThumbnail() {
      // const image = _.get(
      //   this.image,
      //   "options.video_preview_url",
      //   this.image.url
      // );
      return {
        backgroundImage: "url('" + this.image.url + "')",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "contain",
        width: "50px",
        height: "50px",
        minWidth: "50px",
      };
    },
  },
  methods: {
    // toggleSelect() {
    //   if (this.selectable) {
    //     this.$emit("select");
    //   }
    // },
    dropImage(image) {
      this.$emit("dropImage", image);
    },
  },
};
</script>
<style scoped>
.td-misc {
  position: relative;
  z-index: 1;
}
</style>