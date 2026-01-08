
// admin Auths
import adminAuths from '~/repositories/admin/auths'
import adminUsers from '~/repositories/admin/users'

// Mimi Food
import mmsProducts from '~/repositories/admin/mms/products'
import mmsFolders from '~/repositories/admin/mms/folders'
import mmsFiles from '~/repositories/admin/mms/files'


//admin Game
import adminGameNinjas from '~/repositories/admin/game/ninjas';
import adminGameAvatars from '~/repositories/admin/game/avatars';
import adminDiscounts from '~/repositories/admin/discounts'
import adminSettings from '~/repositories/admin/settings'
import adminHistoriesBankDeposits from '~/repositories/admin/histories/bankDeposits'
import adminHistoriesWalletTransactions from '~/repositories/admin/histories/walletTransactions'
import adminHistoriesGameAccountSolds from '~/repositories/admin/histories/gameAccountSolds'

export default ($api_mms) => ({
  // admin Auths
  adminAuths: adminAuths($api_mms),
  adminUsers: adminUsers($api_mms),
  mmsProducts: mmsProducts($api_mms),
  mmsFolders: mmsFolders($api_mms),
  mmsFiles: mmsFiles($api_mms),

  // admin Game
  adminGameNinjas: adminGameNinjas($api_mms),
  adminGameAvatars: adminGameAvatars($api_mms),
  adminDiscounts: adminDiscounts($api_mms),
  adminSettings: adminSettings($api_mms),
  adminHistoriesBankDeposits: adminHistoriesBankDeposits($api_mms),
  adminHistoriesWalletTransactions: adminHistoriesWalletTransactions($api_mms),
  adminHistoriesGameAccountSolds: adminHistoriesGameAccountSolds($api_mms),
})
