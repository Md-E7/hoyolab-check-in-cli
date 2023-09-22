import { ofetch } from 'ofetch'
import { HoyolabCookieError } from '../exception/hoyolab-cookie-error'
import { HoyolabActIdError } from '../exception/hoyolab-act-id-error'
import { config, logger } from '../index'
import type { Account } from '../types'

export class HonkaiImpactService {
  private readonly cookie: string
  private readonly act_id: string

  private readonly request = ofetch.create({
    baseURL: 'https://sg-public-api.hoyolab.com/event/mani',
    query: { lang: 'en-us' },
    ignoreResponseError: true
  })

  constructor (cookie: string, actId: string) {
    this.cookie = cookie
    this.act_id = actId
  }

  async checkIn (): Promise<any> {
    return await this.request('/sign', {
      method: 'POST',
      headers: { cookie: this.cookie },
      body: { act_id: this.act_id },
      onResponse ({ request, options, response }): Promise<void> | void {
        logger.debug({ request, options, response: response._data }, 'honkai impact check-in')

        if (response._data.retcode === -100) {
          throw new HoyolabCookieError('Cookie is invalid or expired', response._data.retcode)
        }

        if (response._data.retcode === -500012 || response._data.retcode === -500015) {
          throw new HoyolabActIdError('Invalid act_id', response._data.retcode)
        }
      }
    })
  }

  async start (account: Account): Promise<boolean> {
    try {
      await this.checkIn()

      return true
    } catch (e) {
      if (e instanceof HoyolabCookieError) {
        logger.error(`Akun hoyolab ${account.name} cookie tidak valid`)
        account.cookie = null
        config.update(account.name, account)
      }

      if (e instanceof HoyolabActIdError) {
        logger.error(`Akun hoyolab ${account.name} honkai_impact_act_id tidak valid`)
        account.honkai_impact_act_id = null
        config.update(account.name, account)
      }

      return false
    }
  }
}
