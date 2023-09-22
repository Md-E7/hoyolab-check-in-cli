import { existsSync, writeFileSync, readFileSync } from 'fs'
import { homedir } from 'os'
import { join } from 'path'
import { destr } from 'destr'
import { logger } from './index'
import type { Account } from './types'

export class Config {
  private readonly filePath: string

  constructor () {
    this.filePath = join(homedir(), '.hoyolab-check-in.json')

    if (!existsSync(this.filePath)) {
      writeFileSync(this.filePath, JSON.stringify([]), 'utf-8')
    }
  }

  getAll (): Account[] {
    try {
      const accounts = readFileSync(this.filePath, 'utf-8')
      return destr(accounts)
    } catch (error) {
      logger.error(error, 'Kesalahan saat mengambil semua data akun hoyolab')
      return []
    }
  }

  get (accountName: string): Account | undefined {
    logger.debug(`Mengambil data akun hoyolab ${accountName}`)

    const accounts = this.getAll()
    return accounts.find((value) => value.name === accountName)
  }

  has (accountName: string): boolean {
    return Boolean(this.get(accountName))
  }

  add (data: Account): void {
    logger.debug(data, 'Menambahkan akun hoyolab')

    try {
      const accounts = this.getAll()
      accounts.push(data)
      writeFileSync(this.filePath, JSON.stringify(accounts, null, 2), 'utf-8')
    } catch (error) {
      logger.error(error, 'Kesalahan saat menambahkan akun')
    }
  }

  update (accountName: string, data: Account): void {
    logger.debug(data, 'Memperbarui data akun hoyolab')

    try {
      const accounts = this.getAll()
      const index = accounts.findIndex((value) => value.name === accountName)
      if (index !== -1) {
        accounts[index] = data
        writeFileSync(this.filePath, JSON.stringify(accounts, null, 2), 'utf-8')
      } else {
        logger.error(`Akun hoyolab ${accountName} tidak ada`)
      }
    } catch (error) {
      logger.error('Kesalahan saat memperbarui data akun hoyolab')
    }
  }

  remove (accountName: string): void {
    logger.debug(`Menghapus data akun hoyolab ${accountName}`)

    try {
      let accounts = this.getAll()
      accounts = accounts.filter((value) => value.name !== accountName)
      writeFileSync(this.filePath, JSON.stringify(accounts, null, 2), 'utf-8')
    } catch (error) {
      logger.error(error, 'Kesalahan saat menghapus data akun hoyolab')
    }
  }
}
