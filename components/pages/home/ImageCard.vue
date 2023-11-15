<template>
  <client-only>
    <div v-if="game" class="image-card">
      <img
        v-if="game.image"
        preload
        :src="game.image"
        alt=""
        class="image-ninja"
      />
    </div>
  </client-only>
</template>
<script>

export default {
  name: "ImageCard",
  components: {},
  props: {
    game: {
      type: Object,
      default: () => {},
    },
  },
  mounted() {},

  computed: {},
  methods: {},
};
</script>
<style lang="scss" scoped>
.image-card {
  position: relative;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: flex-start;
  // height: 220px;

  overflow: hidden;
  // border-radius: 5px;

  img {
    width: 100%;
    height: 240px;
    aspect-ratio: 4/3 !important;
  }
}

@media (max-width: 1000px) {
  .image-card {
    img {
      height: 170px ;
    }
  }
}
@media (max-width: 800px) {
  .image-card {
    img {
      height: 130px ;
    }
  }
}
@media (max-width: 600px) {
  .image-card {
    img {
      height: 180px;
    }
  }
}
@media (max-width: 500px) {
  .image-card {
    img {
      height: 150px;
    }
  }
}
@media (max-width: 400px) {
  .image-card {
    img {
      height: 140px;
    }
  }
}
@media (max-width: 360px) {
  .image-card {
    img {
      height: 130px;
    }
  }
}
.account-ingame {
  right: 4px;
}
.account-cash-atm {
  left: 4px;
  font-size: 11px;
  font-weight: 700;
}
.account-ingame,
.account-cash-atm {
  position: absolute;
  height: 13% !important;
  top: 4px;
  font-size: 13px;
  font-weight: 450;
  width: auto !important;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 3px;
  padding: 0px 5px;
  color: #ffffff;
  background: #a21d0a;
  .v-btn--icon.v-size--default {
    height: 20px;
    width: 20px;
    margin: 0 -5px;
    i {
      height: 15px;
      width: 15px;
      line-height: 15px;
      font-size: 14px;
    }
  }
}
</style>
