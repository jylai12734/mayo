require('dotenv').config();
const {Client, IntentsBitField, Events, GatewayIntentBits, SlashCommandBuilder, EmbedBuilder} = require('discord.js');

const client = new Client({
  // intents are a set of events accessible to the bot
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent
  ]
});

client.on('ready', (c) => {
  // print when the bot is ready
  console.log(`${c.user.username} is online.`);
});

client.on('messageCreate', (msg) => {
  if (msg.content === '135') {
    msg.reply('EE');
    msg.channel.send('EE HAS BEEN FOUND');
  }
});

client.on('interactionCreate', async (interaction) => {
  // check if interaction is a button click
  if (interaction.isButton()) {
    try {
      const role = interaction.guild.roles.cache.get(interaction.customId);
      await interaction.deferReply({ephemeral: true});
      if (!role) {
        interaction.editReply({
          content: "I couldn't find that role."
        });
        return;
      }
  
      const hasRole = interaction.member.roles.cache.has(role.id);
  
      if (hasRole) {
        await interaction.member.roles.remove(role);
        await interaction.editReply(`The role ${role} has been removed.`);
        return;
      }
  
      await interaction.member.roles.add(role);
      await interaction.editReply(`The role ${role} has been added.`);
    } catch (error) {
      console.log(`There was an error: ${error}`);
    }
  }
  // check if slash command is valid
  if (!interaction.isChatInputCommand()) return;
  if (interaction.commandName === 'hello') interaction.reply('mayo');
  if (interaction.commandName === 'gargle') interaction.reply('mayonnaise gargling');
  if (interaction.commandName === '4hed') interaction.reply('3 cubits wide');
  if (interaction.commandName === 'add') {
    const num1 = interaction.options.get('first-number')?.value;
    const num2 = interaction.options.get('second-number')?.value;
    interaction.reply(`${num1 + num2}`);
  }
  if (interaction.commandName === 'embed') {
    const embed = new EmbedBuilder()
      .setTitle('THIS IS THE TITLE')
      .setDescription('THIS IS THE DESCRIPTION')
      .setColor('Random')
      .addFields(
        {
          name: 'FIELD TITLE 1',
          value: '1',
          inline: true // this allows your fields to be laid out horizontally
        },
        {
          name: 'FIELD TITLE 2',
          value: '2',
          inline: true
        },
        {
          name: 'NOT INLINE FIELD TITLE',
          value: '3'
        }
      )
    interaction.reply({embeds: [embed]})
  }
});

client.login(process.env.TOKEN);