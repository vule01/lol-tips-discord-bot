require('dotenv').config();
const { REST, Routes, ApplicationCommandOptionType } = require('discord.js');

const commands = [
    {
        name: 'lore',
        description: 'Displays the champion\'s lore.',
        options: [
            {
                name: 'champion-name',
                description: 'The name of the champion.',
                type: ApplicationCommandOptionType.String,
                required: true,
            }
        ]
    },
    {
        name: 'play',
        description: 'Get a tip for playing the champion',
        options: [
            {
                name: 'champion-name',
                description: 'The name of the champion.',
                type: ApplicationCommandOptionType.String,
                required: true,
            }
        ]
        
    },
    {
        name: 'versus',
        description: 'Get a tip for playing against the champion',
        options: [
            {
                name: 'champion-name',
                description: 'The name of the champion.',
                type: ApplicationCommandOptionType.String,
                required: true,
            }
        ]
        
    }
];

const rest = new REST({ version: '10' }).setToken(process.env.BOT_TOKEN);

const registerCommands = async () => {
    try {
        console.log('Registering slash commands...');

        await rest.put(
            Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
            { body: commands }
        )

        console.log(`Slash commands were registered successfully`);
    } catch (err) {
        console.log(`There was an error: ${err}`);
    }
};

module.exports = { registerCommands };