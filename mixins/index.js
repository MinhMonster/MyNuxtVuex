


import { createNamespacedHelpers } from "vuex";
// import moment from "moment-timezone";
// const globalMapper = createNamespacedHelpers("shop/global");

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
          text: "Sv6 - Tone",
          value: 6,
        },
        {
          text: "Sv7 - Suzan",
          value: 7,
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
    // ...globalMapper.mapGetters(["shopRegion", "getTimezoneName"]),
    // getLocaleMoment() {
    //   switch (this.shopRegion()) {
    //     case "TW":
    //       return "zh-tw";
    //     default:
    //       return "ja";
    //   }
    // },
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

    format_number(number) {
      const number_toFixed = Number(number).toFixed(0);
      const result = Intl.NumberFormat().format(number_toFixed)
      return result.replace(",", ".").replace(",", ".").replace(",", ".").replace(",", ".");
    },
    cash_atm(number) {
      return this.format_number(Math.round((number * 0.85) / 10000).toFixed(0) * 10000)
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
          return "Kuani";
          break;
        case "5":
          return "katana";
          break;
        case "6":
          return "Tone";
          break;
        case "7":
          return "Suzan";
          break;
        case "8":
          return "SenSha";
          break;
      }
    },

    typeNinja(type) {
      switch (type) {
        case "3":
          return "Thường";
          break;
        case "1":
          return "VIP";
          break;
        case "2":
          return "TTGT";
          break;
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
          break;
      }
    }


    // formatRangeTime(
    //   timeStart,
    //   timeEnd,
    //   formatInput = "YYYY-MM-DD HH:mm:ss UTC",
    //   isUTC = true
    // ) {
    //   moment.locale(this.getLocaleMoment);
    //   let result = "";
    //   if (isUTC) {
    //     const momentStart = moment
    //       .utc(timeStart, formatInput)
    //       .tz(this.getTimezoneName());
    //     const momentEnd = moment
    //       .utc(timeEnd, formatInput)
    //       .tz(this.getTimezoneName());
    //     if (
    //       momentStart.format("YYYY-MM-DD") === momentEnd.format("YYYY-MM-DD")
    //     ) {
    //       result =
    //         momentStart.format("YYYY/MM/DD(dd) HH:mm") +
    //         " ~ " +
    //         momentEnd.format("HH:mm");
    //     }
    //   }
    //   return result;
    // },
    // checkTimeBetween(startAt, endAt, time) {
    //   const momentStart = moment
    //     .utc(startAt, "YYYY-MM-DD HH:mm:ss UTC")
    //     .tz(this.getTimezoneName());
    //   const momentEnd = moment
    //     .utc(endAt, "YYYY-MM-DD HH:mm:ss UTC")
    //     .tz(this.getTimezoneName());
    //   return (
    //     momentEnd.format("YYYY-MM-DD HH:mm") >= time &&
    //     momentStart.format("YYYY-MM-DD HH:mm") <= time
    //   );
    // },
    // formatTitleCalendar(start) {
    //   moment.locale(this.getLocaleMoment);
    //   const momentStart = moment(start).tz(this.getTimezoneName());
    //   return momentStart.format("MMM YYYY");
    // },
    // formatTimeByAccount(time) {
    //   const timeByAccount = moment
    //     .utc(time, "YYYY-MM-DD HH:mm")
    //     .tz(this.getTimezoneName());
    //   return timeByAccount.format("YYYY/MM/DD(dd) HH:mm");
    // },
  },
};
