import { createCommand } from 'commander'
import { addAccountSubCommand } from './subcommands/add-account-sub-command'
import { getAccountSubCommand } from './subcommands/get-account-sub-command'
import { updateAccountSubCommand } from './subcommands/update-account-sub-command'
import { removeAccountSubCommand } from './subcommands/remove-account-sub-command'
import { listAccountSubCommand } from './subcommands/list-account-sub-command'

export const accountCommand = createCommand('account')
  .description('Untuk menambah, mengambil, memperbarui, menghapus akun hoyolab')

accountCommand.addCommand(addAccountSubCommand)
accountCommand.addCommand(getAccountSubCommand)
accountCommand.addCommand(updateAccountSubCommand)
accountCommand.addCommand(removeAccountSubCommand)
accountCommand.addCommand(listAccountSubCommand)
