import type { Account } from './types'
import { table } from 'table'

const nullIfEmpty = (value: string | null): string => value == null || value.length === 0 ? 'null' : value

export const showAccountData = (accounts: Account[]): void => {
  const data = [
    ['name', 'cookie', 'honkai_impact_act_id', 'genshin_impact_act_id', 'honkai_star_rail_act_id']
  ]

  for (const account of accounts) {
    data.push([
      account.name,
      nullIfEmpty(account.cookie),
      nullIfEmpty(account.honkai_impact_act_id),
      nullIfEmpty(account.genshin_impact_act_id),
      nullIfEmpty(account.honkai_star_rail_act_id)
    ])
  }

  console.log(table(data, {
    columnDefault: {
      truncate: 20,
      width: 20,
      verticalAlignment: 'middle'
    },
    border: {
      topBody: '─',
      topJoin: '┬',
      topLeft: '┌',
      topRight: '┐',

      bottomBody: '─',
      bottomJoin: '┴',
      bottomLeft: '└',
      bottomRight: '┘',

      bodyLeft: '│',
      bodyRight: '│',
      bodyJoin: '│',

      joinBody: '─',
      joinLeft: '├',
      joinRight: '┤',
      joinJoin: '┼'
    }
  }))
}
