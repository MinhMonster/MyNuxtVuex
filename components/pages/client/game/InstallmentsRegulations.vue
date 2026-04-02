<template>
  <div class="guide-box">
    <div class="guide-title">Quy định mua trả góp</div>

    <p>
      - Thanh toán trước <b>70%</b> giá trị Nick, bạn sẽ nhận được
      <b>Tài khoản và Mật khẩu </b> Nick.
    </p>

    <p>- Hạn thanh toán: <b>1 tháng</b> (kể từ ngày trả góp).</p>

    <p>- Phí trả góp: <b>0%</b>.</p>
    <p>
      - Thanh toán đủ <b>100%</b> giá trị Nick, bạn sẽ nhận được Mã Pin để
      chuyển đăng ký sim. (Áp dụng cho Nick Avatar và Ninja)
    </p>

    <p>
      - Trong thời gian thanh toán, bạn cần thanh toán số tiền còn lại để giao
      dịch hoàn tất.
    </p>

    <p>
      - Nếu bạn huỷ trả góp trước hạn thanh toán sẽ được hoàn
      <b>50% số tiền đã thanh toán.</b>
    </p>

    <p>
      - Nếu quá hạn thanh toán, giao dịch sẽ <b>bị huỷ</b> và bạn được
      hoàn lại <b>30% số tiền đã thanh toán</b>. Nick sẽ bị thu hồi và được mở
      bán lại.
    </p>

    <p>
      - Tiền chỉ được hoàn khi Admin kiểm tra nick không có vấn đề, nick không
      bị tổn hại gì gây ảnh hưởng giá trị của nick.
    </p>

    <div class="note-box">
      <b>Ví dụ:</b> Nick giá 1,000,000đ → thanh toán trước 700,000đ.<br />
      - Nếu huỷ trước hạn → bạn nhận lại 50% = <b>350,000đ</b>.<br />
      - Nếu quá hạn → bạn nhận lại 30% = <b>210,000đ</b>.
    </div>
    <!-- <div class="note-box">
      <b>Lưu ý:</b> Số tiền trả góp và tiền hoàn có thể được điều chỉnh tuỳ Nick sao cho hợp lý.<br />
    </div> -->
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
