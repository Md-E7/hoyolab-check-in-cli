import { createCommand } from 'commander'
import { config, logger } from '../../index'

export const removeAccountSubCommand = createCommand('remove')
  .description('Untuk menghapus data akun hoyolab')
  .argument('name', 'Nama akun hoyolab kalian')
  .action((name) => {
    const account = config.get(name)

    if (account == null) {
      logger.info(`Akun hoyolab ${name} tidak ada`)
      return
    }

    config.remove(name)

    logger.info(`Akun hoyolab ${name} berhasil dihapus`)
  })
