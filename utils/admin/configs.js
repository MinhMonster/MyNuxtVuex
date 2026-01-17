export const menus = _.cloneDeep([
  // {
  //   icon: "mdi-file-document-edit",
  //   title: "Dev",
  //   to: "/admin/deverlopers",
  // },
  // {
  //   icon: "mdi-file-document-edit",
  //   title: "Finances",
  //   to: "/admin/finances",
  // },
  // {
  //   icon: "mdi-playlist-edit",
  //   title: "Menus",
  //   to: "/admin/menus",
  // },
  {
    icon: "mdi-account",
    title: "Users",
    to: "/admin/users",
  },
  {
    icon: "mdi-bank-plus",
    title: "Bank Transfer",
    to: "/admin/history/bank-deposits",
  },
  {
    icon: "mdi-account-switch-outline",
    title: "Transections",
    to: "/admin/history/wallet-transactions",
  },
  {
    icon: "mdi-cart-variant",
    title: "History",
    to: "/admin/history/game-account-sold",
  },
  {
    icon: "mdi-cart-plus",
    title: "Game Services",
    sub_menus: [
      {
        icon: "mdi-carrot",
        title: "Carrots",
        to: "/admin/history/carrots",
      },
      {
        icon: "mdi-hand-coin-outline",
        title: "Xu Ninjas",
        to: "/admin/history/xu-ninjas",
      },
    ]
  },
  {
    icon: "mdi-gamepad-circle-down",
    title: "Game Accounts",
    sub_menus: [
      {
        icon: "mdi-ninja",
        title: "Ninja",
        to: "/admin/game/ninjas",
      },
      {
        icon: "mdi-tree",
        title: "Avatar",
        to: "/admin/game/avatars",
      },
      {
        icon: "mdi-crystal-ball",
        title: "Dragon Ball",
        to: "/admin/game/dragon-balls",
      },
    ]
  },
  {
    icon: "mdi-sale",
    title: "Discounts",
    to: "/admin/discounts",
  },
  {
    icon: "mdi-file-document-edit",
    title: "Topics",
    to: "/admin/topics",
  },
  {
    icon: "mdi-calendar-star-four-points",
    title: "Events",
    to: "/admin/events/daily",
  },
  {
    icon: "mdi-translate",
    title: "Learn Languages",
    to: "/admin/learn_languages",
  },
  {
    icon: "mdi-image",
    title: "Medias",
    to: "/admin/medias",
  },
  {
    icon: "mdi-factory",
    title: "Mimi Food",
    to: "/admin/mms",
  },
]);
