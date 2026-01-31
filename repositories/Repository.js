// repositories
import gameNinjaCoin from '~/repositories/home/game/ninja-coin'

import clientGameAvatars from '~/repositories/client/game/avatars'
import clientGameDragonBalls from '~/repositories/client/game/dragonBalls'
import clientGameNinjaSchools from '~/repositories/client/game/ninjaSchools'

import homeUsers from '~/repositories/home/users'
import clientTopics from '~/repositories/client/topics'
import clientCarrots from '~/repositories/client/carrots'

import clientDailyEvents from '~/repositories/home/events/daily'
import settings from '~/repositories/home/settings'

const repositories = {
  // Home Page
  gameNinjaCoin,

  clientGameAvatars,
  clientGameDragonBalls,
  clientGameNinjaSchools,

  homeUsers,
  clientTopics,
  clientCarrots,
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
