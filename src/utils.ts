import type { Account } from './types'
import { logger } from './index'

const isNotNullOrEmpty = (value: string | null): boolean => {
  return value != null && value.length !== 0
}

export const showAccountData = (account: Account): void => {
  logger.info(`name: ${account.name}`)
  logger.info(`cookie: ${isNotNullOrEmpty(account.cookie) ? account.cookie?.substring(0, 25) + '...' : null}`)
  logger.info(`honkai_impact_act_id: ${isNotNullOrEmpty(account.honkai_impact_act_id) ? account.honkai_impact_act_id : null}`)
  logger.info(`genshin_impact_act_id: ${isNotNullOrEmpty(account.genshin_impact_act_id) ? account.genshin_impact_act_id : null}`)
  logger.info(`honkai_star_rail_act_id: ${isNotNullOrEmpty(account.honkai_star_rail_act_id) ? account.honkai_star_rail_act_id : null}`)
}
