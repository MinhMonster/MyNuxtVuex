


import { createNamespacedHelpers } from "vuex";
// import moment from "moment-timezone";
// const globalMapper = createNamespacedHelpers("shop/global");

export default {
  data() {
    return {
      currentYear: new Date().getFullYear(),
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
      const result = Intl.NumberFormat().format(number)
      return result;
    },
    time_10(time) {
      if (time > 1000){
        return time %100;
      } else {
        return time < 10 ? "0" + time : time;

      }

    },

    format_money(money){
      // if(money = 0) {

      // }
      if(money >= 0 && money < 1000) {
        return 0;
      } else {
        return Intl.NumberFormat().format(Math.round(money/1000) )+ "K";

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
