<template>
  <div class="guide-box">
    <div class="guide-title">Quy định đặt cọc</div>

    <p>- Đặt cọc ban đầu <b>30%</b> giá trị tài khoản để giữ Nick.</p>

    <p>- Thời gian thanh toán: <b>7 ngày</b> (không tính ngày đặt cọc).</p>

    <p>- Phí đặt cọc: <b>0%</b>.</p>

    <p>
      - Trong thời gian thanh toán, bạn cần hoàn tất số tiền còn lại để giao
      dịch hoàn tất.
    </p>

    <p>
      - Nếu quá thời gian, giao dịch sẽ <b>bị huỷ</b> và bạn chỉ được hoàn lại
      <b>20% số tiền đã đặt cọc</b>. Nick sẽ được mở bán lại.
    </p>

    <div class="note-box">
      <b>Ví dụ:</b> Nick giá 1,000,000đ → đặt cọc trước 300,000đ.<br />
      Nếu huỷ, bạn chỉ nhận lại 20% = <b>60,000đ</b>.
    </div>

    <div class="note-box">
      <b>Lưu ý:</b> Hệ thống xử lý hoàn toàn tự động. Không hỗ trợ gia hạn hoặc
      thay đổi quy định.
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: "Quy định đặt cọc Mua Nick",
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
  border-radius: 4px;
  padding: 10px;
  margin-top: 5px;
  margin-bottom: 5px;
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
