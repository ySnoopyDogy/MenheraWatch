import { GuildMember, MessageEmbed, MessageReaction, TextChannel } from 'discord.js';
import WatchClient from '../client';
import Event from '../structures/event';
import constants from '../util/constants';

export default class MessageReactionAdd extends Event {
  constructor(client: WatchClient) {
    super(client, 'messageReactionAdd');
  }

  async run(reaction: MessageReaction, user: GuildMember): Promise<void> {
    const { message } = reaction;
    if (message.channel.id !== constants.channels.suggestQueue) return;
    if (user.id !== process.env.OWNER_ID) return;

    const Handler = async () => {
      if (reaction.emoji.name === '✅') {
        const confirmedChannel = this.client.channels.cache.get(
          constants.channels.suggestAccepted
        ) as TextChannel;
        const oldEmbed = message.embeds[0];
        const newEmbed = new MessageEmbed()
          .setDescription(oldEmbed.description)
          .setColor('#17ec39')
          .setThumbnail(oldEmbed.thumbnail.url)
          .setTitle('Sugestão aceita!')
          .setFooter(oldEmbed.footer.text)
          .setTimestamp(new Date(oldEmbed.timestamp))
          .setAuthor(oldEmbed.author.name, oldEmbed.author.iconURL);
        confirmedChannel.send(newEmbed);
        message.delete({ timeout: 2500 }).catch();
      }
      if (reaction.emoji.name === '❌') {
        const negatedChannel = this.client.channels.cache.get(
          constants.channels.suggestDenied
        ) as TextChannel;
        const oldEmbed = message.embeds[0];
        const newEmbed = new MessageEmbed()
          .setDescription(oldEmbed.description)
          .setColor('#fc0505')
          .setThumbnail(oldEmbed.thumbnail.url)
          .setTitle('Sugestão negada!')
          .setFooter(oldEmbed.footer.text)
          .setTimestamp(new Date(oldEmbed.timestamp))
          .setAuthor(oldEmbed.author.name, oldEmbed.author.iconURL);
        negatedChannel.send(newEmbed);
        message.delete({ timeout: 2500 }).catch();
      }
    };

    if (message.partial) {
      await reaction.fetch();
      await message.fetch();
      Handler();
    } else {
      Handler();
    }
  }
}