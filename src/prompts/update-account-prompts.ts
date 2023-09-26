import type { Account } from '../types'
import type { PromptObject } from 'prompts'

export const updateAccountPrompts = (defaultValues: Account): PromptObject[] => {
  return [
    {
      type: 'text',
      name: 'name',
      message: 'Nama akun hoyolab mu',
      initial: defaultValues.name,
      min: 1,
      max: 20
    },
    {
      type: 'text',
      name: 'cookie',
      message: 'Cookie akun hoyolab mu',
      initial: defaultValues.cookie ?? ''
    },
    {
      type: 'text',
      name: 'honkai_impact_act_id',
      message: 'Honkai impact act id akun hoyolab mu',
      initial: defaultValues.honkai_star_rail_act_id ?? ''
    },
    {
      type: 'text',
      name: 'genshin_impact_act_id',
      message: 'Genshin impact act id akun hoyolab mu',
      initial: defaultValues.genshin_impact_act_id ?? ''
    },
    {
      type: 'text',
      name: 'honkai_star_rail_act_id',
      message: 'Honkai star rail act id akun hoyolab mu',
      initial: defaultValues.honkai_star_rail_act_id ?? ''
    }
  ]
}
