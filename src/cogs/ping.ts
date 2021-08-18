import {Message} from 'discord.js';
import {client} from '../index';

client.on('messageCreate', async (message: Message) => {
  if (message.author.bot) return;
  if (message.content === '!ping') await message.channel.send('pong!');
});
