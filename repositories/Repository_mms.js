
// admin Auths
import adminAuths from '~/repositories/admin/auths'
import adminUsers from '~/repositories/admin/users'

// Mimi Food
import mmsProducts from '~/repositories/admin/mms/products'
import mmsFolders from '~/repositories/admin/mms/folders'
import mmsFiles from '~/repositories/admin/mms/files'
import adminFoldersFiles from '~/repositories/admin/folders/files'
import adminTopics from '~/repositories/admin/topics'

//admin Game
import adminGameNinjas from '~/repositories/admin/game/ninjas';
import adminGameAvatars from '~/repositories/admin/game/avatars';
import adminGameDragonBalls from '~/repositories/admin/game/dragonBalls';
import adminDiscounts from '~/repositories/admin/discounts'
import adminSettings from '~/repositories/admin/settings'
import adminHistoriesBankDeposits from '~/repositories/admin/histories/bankDeposits'
import adminHistoriesWalletTransactions from '~/repositories/admin/histories/walletTransactions'
import adminHistoriesGameAccountSolds from '~/repositories/admin/histories/gameAccountSolds'
import adminHistoriesCarrots from '~/repositories/admin/histories/carrots'

export default ($api_mms) => ({
  // admin Auths
  adminAuths: adminAuths($api_mms),
  adminUsers: adminUsers($api_mms),
  mmsProducts: mmsProducts($api_mms),
  mmsFolders: mmsFolders($api_mms),
  mmsFiles: mmsFiles($api_mms),
  adminFoldersFiles: adminFoldersFiles($api_mms),
  adminTopics: adminTopics($api_mms),

  // admin Game
  adminGameNinjas: adminGameNinjas($api_mms),
  adminGameAvatars: adminGameAvatars($api_mms),
  adminGameDragonBalls: adminGameDragonBalls($api_mms),
  adminDiscounts: adminDiscounts($api_mms),
  adminSettings: adminSettings($api_mms),
  adminHistoriesBankDeposits: adminHistoriesBankDeposits($api_mms),
  adminHistoriesWalletTransactions: adminHistoriesWalletTransactions($api_mms),
  adminHistoriesGameAccountSolds: adminHistoriesGameAccountSolds($api_mms),
  adminHistoriesCarrots: adminHistoriesCarrots($api_mms),
})
