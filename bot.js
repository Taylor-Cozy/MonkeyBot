console.log('🤖 Beep Boop!');

require('dotenv').config();

const Discord = require('discord.js');
const client = new Discord.Client();
module.exports = client, Discord;

client.login(process.env.BOTTOKEN);

client.on('ready', readyDiscord);

function readyDiscord(){
    console.log('❤ Ready for action!');
}

const commandHandler = require("./commands");
client.on('message', commandHandler);


const newMember = require("./newMember");
client.on('guildMemberAdd', newMember);