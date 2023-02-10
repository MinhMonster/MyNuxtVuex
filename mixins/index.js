


import { createNamespacedHelpers } from "vuex";
// import moment from "moment-timezone";
// const globalMapper = createNamespacedHelpers("shop/global");

export default {
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
  },
  methods: {
    format_number(number){
      const result = Intl.NumberFormat().format(number)
      return result;
    },

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
