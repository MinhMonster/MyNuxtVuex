
// Mimi Food
import mmsProducts from '~/repositories/admin/mms/products'
import mmsFolders from '~/repositories/admin/mms/folders'
import mmsFiles from '~/repositories/admin/mms/files'


export default ($api_mms) => ({
  mmsProducts: mmsProducts($api_mms),
  mmsFolders: mmsFolders($api_mms),
  mmsFiles: mmsFiles($api_mms),
})
