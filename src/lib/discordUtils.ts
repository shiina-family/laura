import type { AnyChannel, Message } from 'discord.js'
import { CategoryChannel, SnowflakeUtil, TextChannel } from 'discord.js'

import { client } from '..'

export const isTextChannel = (
  channel: AnyChannel | null | undefined
): channel is TextChannel => channel instanceof TextChannel

export const isCategoryChannel = (
  channel: AnyChannel | null | undefined
): channel is CategoryChannel => channel instanceof CategoryChannel

export const getTextChannelOrNull = (id: string): TextChannel | null => {
  const channel = client.channels.resolve(id)

  return isTextChannel(channel) ? channel : null
}

export const fetchTextChannel = async (id: string): Promise<TextChannel> => {
  const channel = await client.channels.fetch(id)

  if (isTextChannel(channel)) {
    return channel
  } else {
    throw new Error('TextChannel does not exist')
  }
}

export const fetchCategoryChannel = async (
  id: string
): Promise<CategoryChannel> => {
  const channel = await client.channels.fetch(id)

  if (isCategoryChannel(channel)) {
    return channel
  } else {
    throw new Error('CategoryChannel does not exist')
  }
}

export const fetchLastMessageOrNull = async (
  channel: TextChannel
): Promise<Message<boolean> | null> => {
  const messages = await channel.messages.fetch({ limit: 1 }).catch(() => null)
  if (messages === null) return null

  return messages.first() ?? null
}

export const getMemberDisplayName = (
  guildId: string,
  memberId: string
): string => {
  const guild = client.guilds.cache.get(guildId)
  const member = guild?.members.cache.get(memberId)

  return member?.displayName ? member.displayName : 'Unknown'
}

export const toSnowflake = (date: Date) => SnowflakeUtil.generate(date)
