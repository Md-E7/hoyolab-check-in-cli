#! /usr/bin/env node

import data from './../package.json'
import { createConsola } from 'consola'
import { Config } from './config'
import { program } from 'commander'
import { accountCommand } from './commands/account-command'
import { startCommand } from './commands/start-command'

export const logger = createConsola({ level: 3 })
export const config = new Config()

program.name(data.name).description(data.description).version(data.version)

program.addCommand(accountCommand)
program.addCommand(startCommand)

program.parse()
