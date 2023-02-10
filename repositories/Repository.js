

import PromotionRepository from '~/repositories/PromotionRepository'

//admin
import adminTopics from '~/repositories/admin/topics'
import adminDeverlopers from '~/repositories/admin/deverlopers'
import adminFinances from '~/repositories/admin/finances'


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

  // user: UserRepository($axios),
  // comment: CommentRepository($axios),
  // album: AlbumRepository($axios),
  // photo: PhotoRepository($axios),
  // todo: TodoRepository($axios)
})