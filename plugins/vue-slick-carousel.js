import Vue from "vue"
// @ts-ignore (if use tyscript)
import VueSlickCarousel from "vue-slick-carousel";
import "vue-slick-carousel/dist/vue-slick-carousel.css";
// optional style for arrows & dots
import "vue-slick-carousel/dist/vue-slick-carousel-theme.css";
Vue.component("VueSlickCarousel", VueSlickCarousel)

// slickOptions: {
//   dots: true,          // Hiển thị các dots dưới slide
//   infinite: true,      // Cho phép lặp lại vô hạn
//   speed: 500,          // Tốc độ chuyển đổi slide
//   slidesToShow: 3,     // Hiển thị 3 slide cùng lúc
//   slidesToScroll: 1,   // Chỉ kéo 1 slide mỗi lần kéo
//   arrows: false,       // Ẩn nút điều hướng
//   draggable: true,     // Cho phép kéo slide
//   swipeToSlide: true,  // Cho phép vuốt qua các slide
// },
