import { createCommand } from 'commander'
import { config, logger } from '../../index'
import { showAccountData } from '../../utils'

export const getAccountSubCommand = createCommand('get')
  .description('Untuk mengambil data akun hoyolab')
  .argument('name', 'Nama akun hoyolab kalian')
  .action((name) => {
    const account = config.get(name)

    if (account == null) {
      logger.info(`Akun hoyolab ${name} tidak ada`)
      return
    }

    showAccountData([account])
  })
