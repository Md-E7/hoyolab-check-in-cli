import { createCommand } from 'commander'
import Enquirer from 'enquirer'
import { config, logger } from '../../index'

export const updateAccountSubCommand = createCommand('update')
  .description('Untuk memperbarui data akun hoyolab')
  .argument('name', 'Nama akun hoyolab kalian')
  .action((name) => {
    const account = config.get(name)

    if (account == null) {
      logger.info(`Akun hoyolab ${name} tidak ada`)
      return
    }

    const choices: any = [
      {
        name: 'name',
        message: 'Nama akun hoyolab mu',
        initial: name
      },
      {
        name: 'cookie',
        message: 'Cookie akun hoyolab mu',
        initial: account.cookie
      },
      {
        name: 'honkai_impact_act_id',
        message: 'Honkai impact act id akun hoyolab mu',
        initial: account.honkai_impact_act_id
      },
      {
        name: 'genshin_impact_act_id',
        message: 'Genshin impact act id akun hoyolab mu',
        initial: account.genshin_impact_act_id
      },
      {
        name: 'honkai_star_rail_act_id',
        message: 'Honkai star rail act id akun hoyolab mu',
        initial: account.honkai_star_rail_act_id
      }
    ]

    const prompt = Enquirer.prompt({
      name: 'data',
      type: 'form',
      message: 'Masukan data akun hoyolab kalian:',
      choices
    })

    prompt.then(({ data }: any) => {
      config.update(name, {
        name: data.name,
        cookie: data.cookie,
        honkai_impact_act_id: data.honkai_impact_act_id,
        genshin_impact_act_id: data.genshin_impact_act_id,
        honkai_star_rail_act_id: data.honkai_star_rail_act_id
      })

      logger.info('Akun hoyolab berhasil diperbarui')
    }).catch(error => {
      logger.error(error, 'Kesalahan pada update-account-form')
    })
  })
