import { createCommand } from 'commander'
import prompts from 'prompts'
import { addAccountPrompts } from '../../prompts/add-account-prompts'
import { config, logger } from '../../index'

export const addAccountSubCommand = createCommand('add')
  .description('Untuk menambah data akun hoyolab')
  .action(async () => {
    const response = await prompts(addAccountPrompts)

    if (config.has(response.name)) {
      logger.info(`Akun hoyolab ${response.name} sudah ada`)
      return
    }

    config.add({
      name: response.name,
      cookie: response.cookie,
      honkai_impact_act_id: response.honkai_impact_act_id,
      genshin_impact_act_id: response.genshin_impact_act_id,
      honkai_star_rail_act_id: response.honkai_star_rail_act_id
    })

    logger.info('Akun hoyolab berhasil ditambahkan')
  })
