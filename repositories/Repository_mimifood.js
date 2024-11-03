
// Mimi Food
import mimiFoodProducts from '~/repositories/admin/mimifood/products'
import mimiFoodFolders from '~/repositories/admin/mimifood/folders'
import mimiFoodFiles from '~/repositories/admin/mimifood/files'


export default ($api_food) => ({
  mimiFoodProducts: mimiFoodProducts($api_food),
  mimiFoodFolders: mimiFoodFolders($api_food),
  mimiFoodFiles: mimiFoodFiles($api_food),
})
