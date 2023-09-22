import { createCommand } from 'commander'
import { config, logger } from '../../index'
import { showAccountData } from '../../utils'

export const listAccountSubCommand = createCommand('list')
  .description('Untuk mengambil semua data akun hoyolab')
  .action(() => {
    const accounts = config.getAll()

    if (accounts.length === 0) {
      logger.warn('Tidak ada data akun hoyolab yang tersimpan di komputer')
      return
    }

    for (const account of accounts) {
      showAccountData(account)
    }
  })
