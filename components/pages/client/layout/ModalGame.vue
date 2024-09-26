<template>
  <div class="sub-menu-buttom" @click="$refs.modal.show()">
    <div class="footer_icon Member">
      <BaseSvg
        class="icon-menu"
        id="btn-games"
        title="Sản Phẩm"
        aria-label="Sản Phẩm"
        name="list"
      />
    </div>
    <span class="title-menu-buttom">Sản Phẩm</span>
    <ModalPayload ref="modal" :title="`Menu Nick Game`" size="md" hiddenFooter>
      <template #content>
        <div class="base-diglog page-body">
          <div class="base-diglog-bg scroll-y">
            <ul class="base-diglog-list">
              <li
                v-for="(menu, index) in menuOptions"
                :key="index"
                @click="nextPath(menu.path)"
                class="base-diglog-item list-item-hot on"
              >
                <div class="base-diglog-icon">
                  <img :src="menu.image" alt="" />
                </div>
                <span class="base-diglog-name">{{ menu.title }}</span
                ><i class="menu-active"></i>
              </li>
            </ul>
          </div>
        </div>
      </template>
    </ModalPayload>
  </div>
</template>
<script>
import ModalPayload from "@/components/common/ModalPayload";

export default {
  components: {
    ModalPayload,
  },
  data() {
    return {
      menuOptions: [
        {
          title: "Ninja School",
          path: "/teamobi/ninja-school",
          image: "/icon/nj.webp",
        },
        {
          title: "Avatar",
          path: "/teamobi/avatar",
          image: "/icon/avatar.jpeg",
        },
        {
          title: "Ngọc Rồng",
          path: "/teamobi/ngoc-rong",
          image: "/icon/nro.png",
        },
      ],
    };
  },
  methods: {
    nextPath(path) {
      this.$router.push(`${path}`);
      this.$refs.modal.dialog = false;
    },
  },
};
</script>
<style lang="scss" scoped>
.v-card.v-sheet.theme--dark {
  border: 1px solid #a4a4a4;
}

.base-diglog {
  padding: 5px;

  .base-diglog-icon {
    img {
      border-radius: 50%;
      height: 35px;
      width: 35px;
      margin-right: 10px;
    }
  }

  .base-diglog-item {
    cursor: pointer;
    display: flex;
    flex-direction: row;
    // justify-content: center;
    align-items: center;
    position: relative;
    width: 100%;
    margin-bottom: 20px;
  }
}
</style>
