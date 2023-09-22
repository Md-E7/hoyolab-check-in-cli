import { createCommand } from 'commander'
import Enquirer from 'enquirer'
import { config, logger } from '../../index'

export const addAccountSubCommand = createCommand('add')
  .description('Untuk menambah data akun hoyolab')
  .action(() => {
    const prompt = Enquirer.prompt({
      name: 'data',
      type: 'form',
      message: 'Masukan data akun hoyolab kalian:',
      choices: [
        {
          name: 'name',
          message: 'Nama akun hoyolab mu'
        },
        {
          name: 'cookie',
          message: 'Cookie akun hoyolab mu'
        },
        {
          name: 'honkai_impact_act_id',
          message: 'Honkai impact act id akun hoyolab mu'
        },
        {
          name: 'genshin_impact_act_id',
          message: 'Genshin impact act id akun hoyolab mu'
        },
        {
          name: 'honkai_star_rail_act_id',
          message: 'Honkai star rail act id akun hoyolab mu'
        }
      ]
    })

    prompt.then(({ data }: any) => {
      if (config.has(data.name)) {
        logger.info(`Akun hoyolab ${data.name} sudah ada`)
        return
      }

      config.add({
        name: data.name,
        cookie: data.cookie,
        honkai_impact_act_id: data.honkai_impact_act_id,
        genshin_impact_act_id: data.genshin_impact_act_id,
        honkai_star_rail_act_id: data.honkai_star_rail_act_id
      })

      logger.info('Akun hoyolab berhasil ditambahkan')
    }).catch(error => {
      logger.error(error, 'Kesalahan pada add-account-form')
    })
  })
