import { createCommand } from 'commander'
import { config, logger } from '../index'
import { HonkaiImpactService } from '../service/honkai-impact-service'
import { GenshinImpactService } from '../service/genshin-impact-service'
import { HonkaiStarRailService } from '../service/honkai-star-rail-service'

export const startCommand = createCommand('start')
  .description('Untuk melakukan check-in otomatis pada akun hoyolab')
  .action(async () => {
    const accounts = config.getAll()

    for (const account of accounts) {
      if (account.cookie == null || account.cookie.length === 0) {
        logger.warn(`Check-in otomatis pada akun ${account.name} dilewati karena cookie null atau kosong`)
        continue
      }

      if (account.honkai_impact_act_id != null && account.honkai_impact_act_id.length !== 0) {
        const honkaiImpactService = new HonkaiImpactService(account.cookie, account.honkai_impact_act_id)
        await honkaiImpactService.start(account)
      } else {
        logger.warn(`Check-in otomatis pada akun ${account.name} di game Honkai Impact dilewati karena honkai_impact_act_id null atau kosong`)
      }

      if (account.genshin_impact_act_id != null && account.genshin_impact_act_id.length !== 0) {
        const genshinImpactService = new GenshinImpactService(account.cookie, account.genshin_impact_act_id)
        await genshinImpactService.start(account)
      } else {
        logger.warn(`Check-in otomatis pada akun ${account.name} di game Genshin Impact dilewati karena genshin_impact_act_id null atau kosong`)
      }

      if (account.honkai_star_rail_act_id != null && account.honkai_star_rail_act_id.length !== 0) {
        const honkaiStarRailService = new HonkaiStarRailService(account.cookie, account.honkai_star_rail_act_id)
        await honkaiStarRailService.start(account)
      } else {
        logger.warn(`Check-in otomatis pada akun ${account.name} di game Genshin Impact dilewati karena honkai_star_rail_act_id null atau kosong`)
      }
    }

    logger.success('Check-in otomatis dijalankan')
  })
