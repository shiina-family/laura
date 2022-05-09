import { TOKEN_BOT_DISCORD, ID_GUILD_MAIN } from './constant'
import { MyBot } from './lib/discord'

const laura = new MyBot({
  intents: 32767,
  partials: ['MESSAGE', 'REACTION', 'USER']
})

;(async () => {
  await laura.loadCogs()
  await laura.loadCommand(ID_GUILD_MAIN)
  await laura.login(TOKEN_BOT_DISCORD)
})().catch(console.error)

export const client = laura
