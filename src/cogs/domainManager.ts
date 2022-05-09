import { MessageEmbed } from 'discord.js'
import { RecurrenceRule, scheduleJob } from 'node-schedule'
import { dedent } from 'ts-dedent'
import { ID_CHANNEL_PLAYGROUND, ID_GUILD_MAIN } from '../constant'
import { Domain } from '../entities/domain'
import { getMemberDisplayName, getTextChannelOrNull } from '../lib/discordUtils'
const schedule = new RecurrenceRule()
schedule.hour = 15
scheduleJob(schedule, async () => {
  const domains = Domain.collectDomainEachOwner()
  const priceEachOwner = Domain.calcPriceEachOwner()
  const priceWithinThreeMonths = Domain.calcPriceWithinMonthEachOwner(3)

  // create embed
  const description = Object.entries(domains).map(([ownerId, domains]) => {
    const price = priceEachOwner.get(ownerId)
    const priceWithin = priceWithinThreeMonths.get(ownerId)
    const displayName = getMemberDisplayName(ID_GUILD_MAIN, ownerId)

    const text = dedent`
      ${displayName} has ${domains.length} domains
      ${Array.from(price!.entries()).map(
        ([iso, price]) => `${price} ${iso}\n`
      )} (total price)
      ${Array.from(priceWithin!.entries()).map(
        ([iso, price]) => `${price} ${iso}\n`
      )} (within 3 months)`

    return text
  })

  const embed = new MessageEmbed()
    .setTitle('Domains')
    .setColor('#0099ff')
    .setDescription(description.join('\n\n'))

  const channel = getTextChannelOrNull(ID_CHANNEL_PLAYGROUND)
  await channel?.send({ embeds: [embed] })
})
