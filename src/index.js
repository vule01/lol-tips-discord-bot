require('dotenv').config();
const { Client, IntentsBitField } = require('discord.js');
const { registerCommands } = require('./register-commands');
const { getLore } = require('./get-champion-info');

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent
    ],
});

client.on('ready', (c) => {
    console.log(`${c.user.tag} is online`);
    registerCommands();
})

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === 'lore') {
        const championName = interaction.options.get('champion-name').value;
        const lore = await getLore(championName);
        interaction.reply(lore);
    }
})

client.login(process.env.BOT_TOKEN);