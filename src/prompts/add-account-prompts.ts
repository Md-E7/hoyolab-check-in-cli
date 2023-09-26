import type { PromptObject } from 'prompts'

export const addAccountPrompts: PromptObject[] = [
  {
    type: 'text',
    name: 'name',
    message: 'Nama akun hoyolab mu',
    min: 1,
    max: 20
  },
  {
    type: 'text',
    name: 'cookie',
    message: 'Cookie akun hoyolab mu'
  },
  {
    type: 'text',
    name: 'honkai_impact_act_id',
    message: 'Honkai impact act id akun hoyolab mu'
  },
  {
    type: 'text',
    name: 'genshin_impact_act_id',
    message: 'Genshin impact act id akun hoyolab mu'
  },
  {
    type: 'text',
    name: 'honkai_star_rail_act_id',
    message: 'Honkai star rail act id akun hoyolab mu'
  }
]
