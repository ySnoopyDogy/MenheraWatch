export type ActivityType = 'PLAYING' | 'LISTENING' | 'WATCHING' | 'STREAMING';

export interface Activity {
  name: string;
  type: ActivityType;
}

export interface ICommands {
  authorName: string;
  authorId: string;
  guildName: string;
  guildId: string;
  commandName: string;
  data: string;
  args: string;
}

export const Colors = {
  Red: 0xfd0000,
  Green: 0x1cf313,
  Cascade: 0x91a8a8,
  Lavender: 0xdf96e6,
};
