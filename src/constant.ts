import { config } from 'dotenv'
import { join } from 'path'

config({ path: join(__dirname, '..', '.env') })

// config
export const TOKEN_BOT_DISCORD = process.env.TOKEN_BOT_DISCORD

export const ID_GUILD_MAIN = '866686450672861214'
export const ID_CHANNEL_MAIN = '866686450672861216'
export const ID_CHANNEL_PLAYGROUND = '877260909154816080'
