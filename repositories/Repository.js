

import PromotionRepository from '~/repositories/PromotionRepository'

//admin
import adminTopics from '~/repositories/admin/topics'
import adminDeverlopers from '~/repositories/admin/deverlopers'


// import UserRepository from '~/repositories/UserRepository'
// import CommentRepository from '~/repositories/CommentRepository'
// import AlbumRepository from '~/repositories/AlbumRepository'
// import PhotoRepository from '~/repositories/PhotoRepository'
// import TodoRepository from '~/repositories/TodoRepository'

export default ($api) => ({
  post: PromotionRepository($api),

  adminTopics: adminTopics($api),
  adminDeverlopers: adminDeverlopers($api),

  // user: UserRepository($axios),
  // comment: CommentRepository($axios),
  // album: AlbumRepository($axios),
  // photo: PhotoRepository($axios),
  // todo: TodoRepository($axios)
})