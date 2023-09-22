import { ofetch } from 'ofetch'
import { HoyolabCookieError } from '../exception/hoyolab-cookie-error'
import { HoyolabActIdError } from '../exception/hoyolab-act-id-error'
import { config, logger } from '../index'
import type { Account } from '../types'

interface ReCheckInResponse {
  message: string
  retcode: number
  data: {
    list: Array<{
      id: number
    }>
  }
}

export class HonkaiStarRailService {
  private readonly cookie: string
  private readonly act_id: string

  private readonly request = ofetch.create({
    baseURL: 'https://sg-public-api.hoyolab.com/event/luna/os',
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
        logger.debug({ request, options, response: response._data }, 'honkai star rail check-in')

        if (response._data.retcode === -100) {
          throw new HoyolabCookieError('Cookie is invalid or expired', response._data.retcode)
        }

        if (response._data.retcode === -400005 || response._data.retcode === -500012) {
          throw new HoyolabActIdError('Invalid act_id', response._data.retcode)
        }
      }
    })
  }

  async getReCheckInMission (): Promise<ReCheckInResponse> {
    return await this.request('/task/list', {
      method: 'GET',
      headers: { cookie: this.cookie },
      query: { act_id: this.act_id },
      onResponse ({ request, options, response }): Promise<void> | void {
        logger.debug({ request, options, response: response._data }, 'honkai star rail get missions')
      }
    })
  }

  async completeTask (taskId: number): Promise<any> {
    return await this.request('/task/complete', {
      method: 'POST',
      headers: { cookie: this.cookie },
      body: {
        id: taskId,
        act_id: this.act_id
      },
      onResponse ({ request, options, response }): Promise<void> | void {
        logger.debug({ request, options, response: response._data }, 'honkai star rail complete task')
      }
    })
  }

  async claimAward (taskId: number): Promise<any> {
    return await this.request('/task/award', {
      method: 'POST',
      headers: { cookie: this.cookie },
      body: {
        id: taskId,
        act_id: this.act_id
      },
      onResponse ({ request, options, response }): Promise<void> | void {
        logger.debug({ request, options, response: response._data }, 'honkai star rail claim award')
      }
    })
  }

  async reCheckIn (): Promise<any> {
    return await this.request('/resign', {
      method: 'POST',
      headers: { cookie: this.cookie },
      body: { act_id: this.act_id },
      onResponse ({ request, options, response }): Promise<void> | void {
        logger.debug({ request, options, response: response._data }, 'honkai star rail re-check-in')
      }
    })
  }

  async start (account: Account): Promise<boolean> {
    try {
      await this.checkIn()

      const missions = await this.getReCheckInMission()

      for (const mission of missions.data.list) {
        await this.completeTask(mission.id)
        await this.claimAward(mission.id)
      }

      await this.reCheckIn()

      return true
    } catch (e) {
      if (e instanceof HoyolabCookieError) {
        logger.error(`Akun hoyolab ${account.name} cookie tidak valid`)
        account.cookie = null
        config.update(account.name, account)
      }

      if (e instanceof HoyolabActIdError) {
        logger.error(`Akun hoyolab ${account.name} honkai_star_rail_act_id tidak valid`)
        account.honkai_star_rail_act_id = null
        config.update(account.name, account)
      }

      return false
    }
  }
}
