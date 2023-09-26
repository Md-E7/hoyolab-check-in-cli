#! /usr/bin/env node

import data from './../package.json'
import pino from 'pino'
import { Config } from './config'
import { program } from 'commander'
import { accountCommand } from './commands/account-command'
import { startCommand } from './commands/start-command'

export const logger = pino({
  level: 'info',
  transport: {
    target: 'pino-pretty'
  }
})

export const config = new Config()

program.name(data.name).description(data.description).version(data.version)

program.addCommand(accountCommand)
program.addCommand(startCommand)

program.parse()
