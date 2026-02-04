


import { mapFields } from "vuex-map-fields";

export default {
  data() {
    return {
      currentYear: new Date().getFullYear(),
      optionsNinjaType: [
        {
          text: "Thường",
          value: 3,
        },
        {
          text: "VIP",
          value: 1,
        },
        {
          text: "TTGT",
          value: 2,
        },
      ],
      optionsNinjaServer: [
        {
          text: "Sv1 - Bokken",
          value: 1,
        },
        {
          text: "Sv2+3 - Shuriken + Tessen",
          value: 2,
        },
        {
          text: "Sv4 - Kunai",
          value: 4,
        },
        {
          text: "Sv5 - Katana",
          value: 5,
        },
        {
          text: "Sv67 - Tone + Sanzu",
          value: 6,
        },
        {
          text: "Sv8 - Sensha",
          value: 8,
        },
      ],
      optionsNinjaClass: [
        {
          text: "Đao",
          value: 1,
        },
        {
          text: "Kiếm",
          value: 2,
        },
        {
          text: "Tiêu",
          value: 3,
        },
        {
          text: "Cung",
          value: 4,
        },
        {
          text: "Quạt",
          value: 5,
        },
        {
          text: "Kunai",
          value: 6,
        },
        {
          text: "Chưa",
          value: 7,
        },
      ]
    }
  },
  computed: {
    ...mapFields("global", {
      isMb: "isMb",
      is_tablet: "is_tablet",
    }),
    isMobile() {
      return this.isMb
    },
    isTablet() {
      return this.is_tablet
    },
    isQueryCopy() {
      return this.$route.query?.copy ? true : false;
    },
    path() {
      return this.$route.path.replace(/\/+$/, "");
    },
    nowYear() {
      var year = this.currentYear
      return year;
    },
    days() {
      var list = [];
      list.push({
        value: null,
        text: "Day",
      });
      for (let i = 1; i <= 31; i++) {
        if (i > 0) {
          list.push({
            value: i,
            text: this.time_10(i),
          });
        }
      }
      return list;
    },
    months() {
      var list = [];
      list.push({
        value: null,
        text: "Month",
      });
      for (let i = 1; i <= 12; i++) {
        if (i > 0) {
          list.push({
            value: i,
            text: this.time_10(i),
          });
        }
      }
      return list;
    },
    years() {
      var list = [];
      for (let i = 1900; i <= this.currentYear; i++) {
        if (i > 0) {
          list.push({
            value: i,
            text: i,
          });
        }
      }
      list.push({
        value: null,
        text: "Year",
      });
      return list.reverse();
    },
  },
  methods: {
    convertToCamelCase(str, delimiter = '/') {
      const parts = str.split(delimiter)
      return parts.shift() + parts.map(p => p.charAt(0).toUpperCase() + p.slice(1)).join('')
    },
    convertToDot(str) {
      return str.replace(/\//g, '.')
    },
    onResize() {
      const screenWidth = document.querySelector("body").clientWidth;
      this.isMb = screenWidth < 768;
      this.is_tablet = screenWidth < 948;
    },
    format_number(number) {
      const number_toFixed = Number(number).toFixed(0);
      const result = Intl.NumberFormat().format(number_toFixed)
      return result.replace(",", ".").replace(",", ".").replace(",", ".").replace(",", ".");
    },
    cash_atm(number) {
      return this.format_number(Math.round((number * 0.85) / 10000).toFixed(0) * 10000)
    },
    profit_atm(account) {
      const percent = 1 - (((account.active_discount || 0) / 100) || 0);
      const profit = (account.selling_price * percent) - account.purchase_price;
      return this.format_number(Math.round(profit / 10000).toFixed(0) * 10000)
    },
    time_10(time) {
      if (time > 1000) {
        return time % 100;
      } else {
        return time < 10 ? "0" + time : time;

      }

    },

    format_money(money) {
      // if(money = 0) {

      // }
      if (money >= 0 && money < 1000) {
        return 0;
      } else {
        return Intl.NumberFormat().format(Math.round(money / 1000)) + "K";

      }
    },

    fileSizeFilter(size) {
      const KB = 1024;
      const MB = KB * 1024;
      const GB = MB * 1024;

      if (size < KB) {
        return size + " B";
      } else if (size < MB) {
        return (size / KB).toFixed(1) + " KB";
      } else if (size < GB) {
        return (size / MB).toFixed(1) + " MB";
      } else {
        return (size / GB).toFixed(1) + " GB";
      }
    },

    isSelected(image, selectedImages) {
      return selectedImages.find((item) => item.url == image.url);
    },

    classNinja(type) {
      switch (type) {
        case "1":
          return "Đao";
          break;
        case "2":
          return "Kiếm";
          break;
        case "3":
          return "Tiêu";
          break;
        case "4":
          return "Cung";
          break;
        case "5":
          return "Quạt";
          break;
        case "6":
          return "Kunai";
          break;
        case "7":
          return "Chưa";
          break;
      }
    },

    serverNinja(type) {
      switch (type) {
        case "1":
          return "Bokken";
          break;
        case "2":
          return "Shuriken + Tessen";
          break;
        case "4":
          return "Kunai";
          break;
        case "5":
          return "katana";
          break;
        case "6":
          return "Tone + Sanzu";
          break;
        case "7":
          return "Tone + Sanzu";
          break;
        case "8":
          return "SenSha";
          break;
      }
    },

    typeNinja(type) {
      switch (type) {
        case "1":
          return "VIP";
        case "2":
          return "Thường";
      }
    },

    class_status(status) {
      switch (status) {
        case "Chờ Duyệt":
          return "warning";
          break;
        case "Thành Công":
          return "success";
          break;
        case "Thất Bại":
          return "danger";
          break;
      }
    },
    statusNinja(status) {
      let setting = {};
      switch (status) {
        case "yes":
          setting = {
            text: "Còn",
            color: "text-primary"
          };
          break;
        case "no":
          setting = {
            text: "Đã Bán",
            color: "text-danger"
          };
          break;
        case "pending":
          setting = {
            text: "Chờ duyệt",
            color: "text-warning"
          };
          break;
        default:
          setting = {
            text: "Không rõ",
            color: "text-muted"
          };
      }
      return `<span class="${setting.color}">${setting.text}</span>`;
    },

    isSold(value) {
      let setting = {};
      switch (Number(value)) {
        case 0:
          setting = {
            text: "Available",
            color: "text-primary"
          };
          break;
        default:
          setting = {
            text: "Sold",
            color: "text-danger"
          };
      }
      return `<span class="${setting.color}">${setting.text}</span>`;
    },
    deletedAt(value) {
      let setting = {};
      switch (value) {
        case "null":
          setting = {
            text: "Active",
            color: "text-primary"
          };
          break;
        default:
          setting = {
            text: "Deleted",
            color: "text-danger"
          };
      }
      return `<span class="${setting.color}">${setting.text}</span>`;
    },

    numberWalletAdmin(wallet) {
      switch (wallet) {
        case "Ví MOMO":
          return "0961646828";
          break;
        case "MB Bank":
          return "8330105578888";
          break;
        case "VietinBank":
          return "107006711803";
          break;
        case "VietcomBank":
          return "0541000311219";
      }
    }
  },
};
