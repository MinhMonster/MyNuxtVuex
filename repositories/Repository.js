
// Home Page
import gameNinjas from '~/repositories/home/game/ninjas'
import gameAvatars from '~/repositories/home/game/avatars'
import gameDragonBalls from '~/repositories/home/game/dragon_balls'

import homeUsers from '~/repositories/home/users'
import homeTopics from '~/repositories/home/topics'



export default ($api) => ({

  // Home Page
  gameNinjas: gameNinjas($api),
  gameAvatars: gameAvatars($api),
  gameDragonBalls: gameDragonBalls($api),
  homeUsers: homeUsers($api),
  homeTopics: homeTopics($api),



})