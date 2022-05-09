import { CommandInteraction } from 'discord.js'

import { client } from '..'

export default {
  data: {
    name: 'ping',
    description: 'BOT がオンラインか確認する。'
  },
  async execute(interaction: CommandInteraction) {
    const latency = Math.round(client.ws.ping)
    await interaction.reply({
      content: `Pong! latency: ${latency}ms`,
      ephemeral: true
    })
  }
}
