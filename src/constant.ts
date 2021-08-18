import {config} from 'dotenv';
import {join} from 'path';

config({path: join(__dirname, '../.env')});

// config
export const discordBotToken = process.env.DISCORD_BOT_TOKEN;
export const channelMainId = '866686450672861216';
export const channelPlaygroundId = '877260909154816080';
