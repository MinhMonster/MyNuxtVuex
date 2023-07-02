

import PromotionRepository from '~/repositories/PromotionRepository'

//admin
import adminTopics from '~/repositories/admin/topics'
import adminDeverlopers from '~/repositories/admin/deverlopers'
import adminFinances from '~/repositories/admin/finances'
import adminUploads from '~/repositories/admin/uploads'
import adminMedias from '~/repositories/admin/medias'
import adminFolders from '~/repositories/admin/folders'

//admin Game
import adminGameNinjas from '~/repositories/admin/game/ninjas'
import adminGameAvatars from '~/repositories/admin/game/avatars'

// import UserRepository from '~/repositories/UserRepository'
// import CommentRepository from '~/repositories/CommentRepository'
// import AlbumRepository from '~/repositories/AlbumRepository'
// import PhotoRepository from '~/repositories/PhotoRepository'
// import TodoRepository from '~/repositories/TodoRepository'

// Home Page
import gameNinjas from '~/repositories/home/game/ninjas'
import gameAvatars from '~/repositories/home/game/avatars'
import gameDragonBalls from '~/repositories/home/game/dragon_balls'

import homeUsers from '~/repositories/home/users'


export default ($api) => ({
  post: PromotionRepository($api),

  adminTopics: adminTopics($api),
  adminDeverlopers: adminDeverlopers($api),
  adminFinances: adminFinances($api),
  adminUploads: adminUploads($api),
  adminMedias: adminMedias($api),
  adminFolders: adminFolders($api),

  // admin Game
  adminGameNinjas: adminGameNinjas($api),
  adminGameAvatars: adminGameAvatars($api),



  // user: UserRepository($axios),
  // comment: CommentRepository($axios),
  // album: AlbumRepository($axios),
  // photo: PhotoRepository($axios),
  // todo: TodoRepository($axios)

  // Home Page
  gameNinjas: gameNinjas($api),
  gameAvatars: gameAvatars($api),
  gameDragonBalls: gameDragonBalls($api),
  homeUsers: homeUsers($api),


})