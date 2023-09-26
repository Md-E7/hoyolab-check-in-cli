import { createCommand } from 'commander'
import prompts from 'prompts'
import { updateAccountPrompts } from '../../prompts/update-account-prompts'
import { config, logger } from '../../index'

export const updateAccountSubCommand = createCommand('update')
  .description('Untuk memperbarui data akun hoyolab')
  .argument('name', 'Nama akun hoyolab kalian')
  .action(async (name) => {
    const account = config.get(name)

    if (account == null) {
      logger.info(`Akun hoyolab ${name} tidak ada`)
      return
    }

    const response = await prompts(updateAccountPrompts(account))

    config.update(name, {
      name: response.name,
      cookie: response.cookie,
      honkai_impact_act_id: response.honkai_impact_act_id,
      genshin_impact_act_id: response.genshin_impact_act_id,
      honkai_star_rail_act_id: response.honkai_star_rail_act_id
    })

    logger.info('Akun hoyolab berhasil diperbarui')
  })
