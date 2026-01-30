// repositories

import clientGameAvatars from '~/repositories/client/game/avatars'
import clientGameDragonBalls from '~/repositories/client/game/dragonBalls'
import clientGameNinjaSchools from '~/repositories/client/game/ninjaSchools'
import clientAccountPurchases from '~/repositories/client/accountPurchases'

import homeUsers from '~/repositories/home/users'
import clientTopics from '~/repositories/client/topics'
import clientCarrots from '~/repositories/client/carrots'
import clientNinjaCoins from '~/repositories/client/ninjaCoins'
import clientTopUpBank from '~/repositories/client/topUpBank'
import clientWalletTransactions from '~/repositories/client/walletTransactions'
import clientDailyEvents from '~/repositories/home/events/daily'
import settings from '~/repositories/home/settings'

const repositories = {
  // Home Page

  clientGameAvatars,
  clientGameDragonBalls,
  clientGameNinjaSchools,
  clientAccountPurchases,

  homeUsers,
  clientTopics,
  clientCarrots,
  clientNinjaCoins,
  clientTopUpBank,
  clientWalletTransactions,
  clientDailyEvents,

  // setting
  settings,
}

export default ($api) =>
  Object.fromEntries(
    Object.entries(repositories).map(([key, repo]) => [
      key,
      repo($api),
    ])
  )
