require('dotenv').config();
const { Client, IntentsBitField } = require('discord.js');
const { registerCommands } = require('./register-commands');
const { getLore, getTips } = require('./get-champion-info');

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

    const championName = interaction.options.get('champion-name').value;
    
    let response;
    if (interaction.commandName === 'lore') {        
        response = await getLore(championName);
    } else if (interaction.commandName === 'play') {
        response = await getTips(championName, true);
    } else if (interaction.commandName === 'versus') {
        response = await getTips(championName, false);
    }
    interaction.reply(response);
})

client.login(process.env.BOT_TOKEN);