// admin Auths
import adminAuths from '~/repositories/admin/auths'

//admin
import adminTopics from '~/repositories/admin/topics'
import adminDeverlopers from '~/repositories/admin/deverlopers'
import adminFinances from '~/repositories/admin/finances'
import adminUploads from '~/repositories/admin/uploads'
import adminMedias from '~/repositories/admin/medias'
import adminFolders from '~/repositories/admin/folders'
import adminUsers from '~/repositories/admin/users'

//admin Game
import adminGameNinjas from '~/repositories/admin/game/ninjas'
import adminGameAvatars from '~/repositories/admin/game/avatars'
import adminGameAccountSold from '~/repositories/admin/histories/game_account_sold'
import adminBankDeposits from '~/repositories/admin/histories/bank_deposits'


// Home Page
import gameNinjas from '~/repositories/home/game/ninjas'
import gameAvatars from '~/repositories/home/game/avatars'
import gameDragonBalls from '~/repositories/home/game/dragon_balls'

import homeUsers from '~/repositories/home/users'
import homeTopics from '~/repositories/home/topics'



export default ($api) => ({

  // admin Auths
  adminAuths: adminAuths($api),

  // admin
  adminTopics: adminTopics($api),
  adminDeverlopers: adminDeverlopers($api),
  adminFinances: adminFinances($api),
  adminUploads: adminUploads($api),
  adminMedias: adminMedias($api),
  adminFolders: adminFolders($api),
  adminUsers: adminUsers($api),


  // admin Game
  adminGameNinjas: adminGameNinjas($api),
  adminGameAvatars: adminGameAvatars($api),
  adminGameAccountSold:adminGameAccountSold($api),
  adminBankDeposits: adminBankDeposits($api),


  // Home Page
  gameNinjas: gameNinjas($api),
  gameAvatars: gameAvatars($api),
  gameDragonBalls: gameDragonBalls($api),
  homeUsers: homeUsers($api),
  homeTopics: homeTopics($api),



})