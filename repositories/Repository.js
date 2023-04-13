

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

// import UserRepository from '~/repositories/UserRepository'
// import CommentRepository from '~/repositories/CommentRepository'
// import AlbumRepository from '~/repositories/AlbumRepository'
// import PhotoRepository from '~/repositories/PhotoRepository'
// import TodoRepository from '~/repositories/TodoRepository'

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



  // user: UserRepository($axios),
  // comment: CommentRepository($axios),
  // album: AlbumRepository($axios),
  // photo: PhotoRepository($axios),
  // todo: TodoRepository($axios)
})