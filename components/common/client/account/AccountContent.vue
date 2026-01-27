<template>
  <section class="mb-3" aria-labelledby="account-info-title">
    <div class="page-body mb-4 mgl--5px mgr--5px">
      <v-row>
        <!-- IMAGE -->
        <v-col cols="12" sm="4" md="2" class="pa-1 pa-md-3">
          <img
            v-if="config"
            class="w-100 over-hidden"
            :src="config.src"
            :alt="config.alt"
            :title="config.title"
          />
        </v-col>

        <!-- CONTENT -->
        <v-col cols="12" sm="8" md="10">
          <p>
            ⭐ Sở hữu
            <strong>{{ config.name }}</strong>
            chỉ sau <strong>1–5 phút</strong>
          </p>
          <!-- Dragon Ball -->
          <template v-if="type === 'dragonBalls'">
            <p>
              ⭐ Tất cả nick Ngọc Rồng trên shop
              <strong class="text-danger">đều là đăng ký ảo</strong>.
            </p>
            <p>⭐ Các bạn mua về chỉ cần đổi mật khẩu là được nhé.</p>
          </template>

          <!-- Avatar + Ninja -->
          <template v-else>
            <p v-if="type === 'avatars'">
              ⭐ Group mới
              <template v-if="!isMobile"
                >, mọi người tham gia giao lưu, trao đổi kinh nghiệm
                nhé</template
              >:
              <a
                href="https://www.facebook.com/groups/avatar.dieuky.teamobi"
                target="_blank"
                rel="noopener"
                class="bold link"
                title="Avatar Diệu Kỳ (2x) - TeaMobi"
              >
                Avatar Diệu Kỳ (2x) - TeaMobi
              </a>
            </p>
            <p>
              ⭐ Nick có
              <strong>Sim đăng ký</strong>.
              <span
                class="bold pointer text-danger"
                @click="$refs.modal.show()"
              >
                Xem HD chuyển Sim
              </span>
            </p>
            <p>
              ⭐ Hỗ trợ
              <strong>trả góp lên đến 1 tháng</strong>, thời gian & số tiền phụ
              thuộc vào giá trị nick.
            </p>
          </template>
          <!-- Guide -->
          <p>
            ⭐ Xem
            <nuxt-link
              to="/guides/huong-dan-mua-nick"
              class="bold text-danger"
              title="Hướng dẫn mua nick game TeaMobi"
            >
              hướng dẫn mua nick
            </nuxt-link>
            để biết cách mua nick được nhanh chóng nhé các bạn.
          </p>
        </v-col>
      </v-row>

      <ModalChangeAccountRegister ref="modal" />
    </div>
  </section>
</template>

<script>
import ModalChangeAccountRegister from "@/components/pages/client/game/ModalChangeAccountRegister";

const CONFIGS = {
  ninjaSchools: {
    src: "https://muabannick.pro/images/banners/banner-ninja-school.png",
    alt: "Nick Ninja School Online - TeaMobi",
    title: "Mua Nick Ninja School Online Uy Tín",
    name: "Nick Ninja School Online",
  },
  avatars: {
    src: "https://muabannick.pro/images/banners/banner-avatar-500x-277.jpg",
    alt: "Avatar Diệu Kỳ (2x) - TeaMobi",
    title: "Mua Nick Avatar Diệu Kỳ (2x)",
    name: "Nick Avatar Diệu Kỳ (2x)",
  },
  dragonBalls: {
    src: "https://muabannick.pro/images/banners/nro.png",
    alt: "Nick Ngọc Rồng Online - TeaMobi",
    title: "Mua Nick Ngọc Rồng Online",
    name: "Nick Ngọc Rồng Online",
  },
};

export default {
  name: "AccountBannerInfo",
  components: { ModalChangeAccountRegister },

  props: {
    module: {
      type: String,
      required: true,
    },
  },

  computed: {
    type() {
      return this.module.split("/").pop();
    },
    config() {
      return CONFIGS[this.type] || null;
    },
  },
};
</script>
