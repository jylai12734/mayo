require('dotenv').config();
const {Client, IntentsBitField, ButtonStyle, ActionRowBuilder, ButtonBuilder} = require('discord.js');

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent
  ]
});

const roles = [
  {
    id: '1250468455971295393',
    label: 'Dev'
  }
]

client.on('ready', async (c) => {
  // print when the bot is ready
  console.log(`${c.user.username} is online.`);
  try {
    const channel = await client.channels.cache.get('1247983926161707048');
    if (!channel) return;

    const row = new ActionRowBuilder();
    roles.forEach((role) => {
      row.components.push(
        new ButtonBuilder()
          .setCustomId(role.id)
          .setLabel(role.label)
          .setStyle(ButtonStyle.Primary)
      )
    })

    await channel.send({
      content: 'Claim or remove a roles below.',
      components: [row]
    });
    process.exit();


  } catch (error) {
    console.log(error);
  }
});

client.login(process.env.TOKEN);