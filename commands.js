const client = require("./bot");

const monkey = require("./commands/monkey.js");
const gif = require("./commands/gif.js");
const avatar = require("./commands/avatar.js");
const info = require("./commands/info.js");
const image = require("./commands/image.js");

const commands = { monkey, gif, avatar, info, image}

module.exports = async function (msg){
    
    let tokens = msg.content.split(" ");
    let command = tokens.shift();

    if(msg.channel.id == '801104638463705128' && command == '!join'){
        client.emit('guildMemberAdd', msg.member);
    }

    if(msg.channel.id == '800853438329520190'){
        if(command.charAt(0) === "!"){
            command = command.substring(1);
            if(command in commands){
                commands[command](msg, tokens);
            }
        }
    }
}