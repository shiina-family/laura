import {Client} from 'discord.js';
import {readdir} from 'fs/promises';
import {join, parse} from 'path';
import * as constant from './constant';
import * as language from './language';


export class MyBot {
  public client = new Client({intents: 32767});

  public loadCogs = async () => {
    const cogs = await readdir(join('src', 'cogs'));
    for (const cog of cogs) {
      const cogName = parse(cog).name;
      await import(`./cogs/${cogName}`);
      console.log(language.loadedCog(cogName));
    }
  };

  public login = async (client = this.client) => {
    await client.login(constant.discordBotToken);
    console.log(language.loggedInAs(client.user!.username));
  };
}
