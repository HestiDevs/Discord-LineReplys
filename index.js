const { Client, Collection } = require("discord.js");
const client = new Client();
const fs = require("fs");
const config = require("./config.json");
require('./replys/main.js');

client.commands = new Collection();

const commandFiles = fs.readdirSync('./commands').filter((file) => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

let prefix = config.prefix;

client.on('ready', () => {
    console.log('Ready');

    client.user.setPresence({
        status: 'online',
        activity: {
            name: 'hestibots.xyz',
            type: 'PLAYING'
        }
    });
});

client.on('message', async (message) => {
    if(message.author.bot) return;
    if(!message.content.startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName) || client.commands.find((cmd) => cmd.alias && cmd.alias.includes(commandName));
    if(!command) return;

    command.run(client, message, args);
});

client.login(config.token);