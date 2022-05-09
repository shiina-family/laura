import type { ChatInputApplicationCommandData } from 'discord.js'
import { Client, CommandInteraction } from 'discord.js'
import { readdir } from 'fs/promises'
import { join, parse } from 'path'

interface ICommand {
  readonly data: ChatInputApplicationCommandData
  readonly execute: (interaction: CommandInteraction) => Promise<void>
}

export class MyBot extends Client {
  readonly commands: ICommand[] = []
  // must be an absolute path
  readonly pathToCogs = join(__dirname, '..', 'cogs')
  readonly pathToCommands = join(__dirname, '..', 'commands')

  async loadCogs() {
    const files = await readdir(this.pathToCogs)

    files.map(parse).forEach(async ({ name }) => {
      // NOTE: must be a relative path
      const path = join('..', 'cogs', name)

      await import(path).then((_) => console.log(`loaded ${name} cog`))
    })
  }

  async loadCommand(guildId: string): Promise<void> {
    const files = await readdir(this.pathToCommands)

    files.map(parse).forEach(async ({ name }) => {
      // NOTE: must be a relative path
      const path = join('..', 'commands', name)
      const command: ICommand = (await import(path)).default

      this.commands.push(command)
    })

    this.once('ready', async () => {
      // NOTE: Log each one. Use set() instead of create() if launch performance is important.
      this.commands.forEach(async ({ data }) => {
        await this.application?.commands
          .create(data, guildId)
          .then((_) => console.log(`created command ${data.name}`))
      })
    })

    this.on('interactionCreate', async (interaction) => {
      if (!(interaction instanceof CommandInteraction)) return

      const command: ICommand | undefined = this.commands.find(
        (command) => interaction.command?.name === command.data.name
      )

      await command?.execute(interaction).catch(console.error)
    })
  }
}
