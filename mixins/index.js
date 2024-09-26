


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
      heightHomeRight: "heightHomeRight",
      showLoginRegister: "showLoginRegister",
      showRegister: "showRegister",
      isFormLoginRegister: "isFormLoginRegister",
      isThemeDark: "isThemeDark"
    }),
    isMobile() {
      return this.isMb
    },
    isTablet() {
      return this.is_tablet
    },
    isDark() {
      return this.isThemeDark
    },
    heightHomeLeft() {
      return this.heightHomeRight
    },
    path() {
      return this.$route.path;
    },
    queryPage() {
      return _.cloneDeep(Number(this.$route.query.page)) || 1;
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
    showModalLoginRegister(value) {
      if (!this.showLoginRegister) {
        this.showLoginRegister = true;
      }
      this.isFormLoginRegister = value;
    },
    onResize() {
      const screenWidth = document.querySelector("body").clientWidth;
      if (screenWidth < 600) {
        this.isMb = true;
      } else {
        this.isMb = false;
      }
      if (screenWidth < 768) {
        this.is_tablet = true;
      } else {
        this.is_tablet = false;
      }
      if (!this.is_tablet && this.path == "/") {
        setTimeout(() => {
          const homeLeft = document.querySelector("#home-left");
          if (homeLeft) {
            const heightHomeRight = homeLeft.clientHeight;
            const heightDichVuGame = document.querySelector("#dich-vu-game").clientHeight;
            if (heightHomeRight / heightDichVuGame <= 7 / 5) {
              this.heightHomeRight = (heightDichVuGame / (515 / 836)) - 30;
            } else {
              this.heightHomeRight = heightHomeRight - 30;
            }
          }
        }, 50);
      }
    },
    format_number(number) {
      const number_toFixed = Number(number).toFixed(0);
      const result = Intl.NumberFormat().format(number_toFixed)
      return result.replace(",", ".").replace(",", ".").replace(",", ".").replace(",", ".");
    },
    cash_atm(number) {
      return this.format_number(Math.round((number * 0.85) / 10000).toFixed(0) * 10000)
    },
    formatTwoNumber(number) {
      number = Number(number);
      if (number < 10) {
        return "0" + `${number}`;
      } else {
        return `${number}`;
      }
    },
    time_10(time) {
      if (time > 1000) {
        return time % 100;
      } else {
        return time < 10 ? "0" + time : time;

      }

    },

    format_money(money) {
      if (money >= 0 && money < 1000) {
        return 0;
      } else {
        return Intl.NumberFormat().format(Math.round(money / 1000)) + "K";

      }
    },

    fileSizeFilter(size) {
      if ((size > 0) && (size < 1000)) {
        return size + "B";
      } else if ((size >= 1000) && (size < 1000 * 1024)) {
        return (size / 1000).toFixed(1) + "KB";
      } else if ((size >= 1000 * 1024) && (size < 1000 * 1024)) {
        return (size / (1000 * 1024)).toFixed(1) + "MB";
      } else {
        return (size / (1000 * 1024 * 1024)).toFixed(1) + "GB";
      }
    },

    classNinja(type) {
      switch (type) {
        case "1":
          return "Đao";
        case "2":
          return "Kiếm";
        case "3":
          return "Tiêu";
        case "4":
          return "Cung";
        case "5":
          return "Quạt";
        case "6":
          return "Kunai";
        case "7":
          return "Chưa";
      }
    },

    serverNinja(type) {
      switch (type) {
        case "1":
          return "Bokken";
        case "2":
          return "Shuriken + Tessen";
        case "4":
          return "Kunai";
        case "5":
          return "katana";
        case "6":
        case "7":
          return "Tone + Sanzu";
        case "8":
          return "SenSha";
      }
    },

    serverNinjaNumber(type) {
      switch (type) {
        case "1":
          return "1";
        case "2":
          return "23";
        case "4":
          return "4";
        case "5":
          return "5";
        case "6":
        case "7":
          return "67";
        case "8":
          return "8";
      }
    },

    typeNinja(type) {
      switch (type) {
        case "3":
          return "Thường";
        case "1":
          return "VIP";
        case "2":
          return "TTGT";
      }
    },

    class_status(status) {
      switch (status) {
        case "Chờ Duyệt":
          return "warning";
        case "Thành Công":
          return "success";
        case "Thất Bại":
          return "danger";
      }
    },

    numberWalletAdmin(wallet) {
      switch (wallet) {
        case "Ví MOMO":
          return "0961646828";
        case "MB Bank":
          return "8330105578888";
        case "VietinBank":
          return "107006711803";
        case "VietcomBank":
          return "0541000311219";
      }
    }
  },
};
