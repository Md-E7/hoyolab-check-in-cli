#! /usr/bin/env node

import data from './../package.json'
import { createConsola } from 'consola'
import { program } from 'commander'

export const logger = createConsola({ level: 3 })

program.name(data.name).description(data.description).version(data.version)

program.parse()
