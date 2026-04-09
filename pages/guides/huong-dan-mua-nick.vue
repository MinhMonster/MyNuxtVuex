<template>
  <client-only>
    <HomePage
      :title="title"
      :loading="!ready"
      full-screen
      goBack
      reload
      @reload="reload()"
    >
      <template v-if="ready" #body>
        <div class="guide-container">
          <p>
            Đầu tiên, bạn hãy <b>chọn Nick muốn mua</b> trên website. Sau đó bấm
            vào nút <b>"Xem Nick"</b> và kiểm tra kỹ thông tin.
          </p>
          <p>
            Khi bạn đã xác nhận đúng Nick cần mua, hãy tiến hành Thanh toán theo
            1 trong các cách sau:
          </p>

          <div class="guide-box">
            <div class="guide-title">Cách 1: Thanh Toán Bằng Mã QR</div>
            <p>- Bấm chọn nút <b>“Thanh Toán QR”</b> trong trang Chi tiết Nick bạn vừa chọn.</p>
            <p>- Quét mã QR có sẵn tương ứng với Nick bạn muốn mua.</p>
            <p>
              - Nếu mã QR bị lỗi, bạn có thể thanh toán thủ công theo thông tin
              bên dưới mã QR.
            </p>
            <p>
              - Sau khi thanh toán, hãy <b>liên hệ với Admin</b> và gửi
              <b>bill chuyển khoản</b> để nhận Nick.
            </p>

            <div class="note-box">
              <b>Lưu ý:</b> Kiểm tra thật kỹ thông tin Nick trước khi thanh toán
              để tránh sai sót.
            </div>
          </div>

          <div class="guide-box">
            <div class="guide-title">Cách 2: Mua Tự Động Trên Website</div>
            <p>- <b>"Đăng nhập"</b> tài khoản của bạn trên Website. Nếu chưa có hãy <b>"Đăng ký"</b> tài khoản trước.</p>
            <p>- Tiến hành <b>"Nạp Tiền"</b> vào tài khoản.</p>
            <p>
              - Sau khi có số dư, chọn Nick muốn mua và <b>"Mua Ngay"</b>.
            </p>
            <p>
              - Khi thanh toán thành công, hệ thống sẽ tự động chuyển bạn đến
              trang <b>"Lịch Sử Mua Nick"</b>.
            </p>
            <p>
              - Tại đây, toàn bộ thông tin Nick sẽ được Admin cập nhật trong vòng
              <b>1–5 phút</b>.
            </p>
            <div class="note-box">
              <b>Lưu ý:</b> Nếu sau thời gian trên vẫn chưa thấy thông tin Nick được cập nhật, hãy liên hệ
              với Admin để được hỗ trợ.
            </div>
          </div>
          <InstallmentsRegulations />
          <DepositRegulations />
          <div class="footer-note">
            <p>
              🎮 Chúc các bạn chọn được Nick ưng ý.<br/>Xin cảm ơn <span>❤️</span></p>
          </div>
        </div>
      </template></HomePage
    ></client-only
  >
</template>

<script>
import HomePage from "@/components/pages/home/HomePage";
import InstallmentsRegulations from "@/components/pages/client/game/InstallmentsRegulations";
import DepositRegulations from "@/components/pages/client/game/DepositRegulations";

import { mapFields } from "vuex-map-fields";

export default {
  layout: "clientLayout",

  components: {
    HomePage,
    InstallmentsRegulations,
    DepositRegulations,
  },
  computed: {
    ...mapFields("global", {
      ready: "ready",
    }),
  },
  async mounted() {
    this.reload();
  },
  methods: {
    async reload() {
      this.ready = false;
      setTimeout(() => {
        this.ready = true;
      }, 500);
    },
  },
  data() {
    return {
      title: "Hướng dẫn Mua Nick",
    };
  },
  head() {
    return {
      title: this.title,
      meta: [
        { hid: "description", name: "description", content: this.title },
        { property: "og:title", content: this.title },
        { property: "og:description", content: this.title },
      ],
    };
  },
};
</script>
<style scoped>
#home-page {
  max-width: 800px;
}
.guide-container {
  background: transparent;
  /* color: #ddd; */
  /* padding: 30px; */
  line-height: 1.7;
  /* max-width: 900px; */
  margin: 20px auto;
  font-size: 15px;
}

.guide-container h2 {
  font-size: 22px;
  font-weight: 700;
  text-align: center;
  margin-bottom: 25px;
  color: #ffd166;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.guide-container p {
  margin: 8px 0;
  color: #ddd;
}

.guide-box {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 10px;
  padding: 18px 10px;
  margin-top: 15px;
  margin-bottom: 25px;
  transition: all 0.3s ease;
}

.guide-box:hover {
  border-color: #00b4d8;
  box-shadow: 0 0 12px rgba(0, 180, 216, 0.2);
}

.guide-title {
  color: #00b4d8;
  font-weight: bold;
  font-size: 16px;
  margin-bottom: 10px;
  border-left: 4px solid #00b4d8;
  padding-left: 10px;
  text-transform: uppercase;
}

.guide-box img {
  display: block;
  margin: 10px auto;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  max-width: 220px;
}

.note-box {
  background: rgba(255, 209, 102, 0.08);
  border-left: 4px solid #ffd166;
  padding: 10px 14px;
  border-radius: 8px;
  font-size: 14px;
  color: #ffeaa7;
  margin-top: 12px;
}

.footer-note {
  text-align: center;
  margin-top: 25px;
  font-style: italic;
  color: #aaa;
  font-size: 14px;
}

.footer-note span {
  color: #ff3366;
}

</style>
