    /*
    Somewhat ugly, specific time quantifier. 
    Loops through an array of time values (i.e. 60 seconds in a minute, 60 mins in an hr)
    */
function getAgeString(birthday, oldBool){
    let age = (Date.now() - birthday) / 1000; // Number of seconds old
    let limit = 60;

    let periods = [60,60,24,365]; // 60 seconds in a minute, 60 mins in hour, 24 hrs in day, 365 days in year
    let periodNames = ['seconds', 'minutes', 'hours', 'days'];
    let ageName = oldBool ? 'old' : 'ago';

    for(var i = 0; i < periods.length; i ++){
        if(age < periods[i]){                                                   // If the age specified is less than the current divisor, then it will create a 0.something
            return `About ${Math.round(age)} ${periodNames[i]} ${ageName}.`;
        } else {
            age /= periods[i];                                                  // If greater than the current divisor, divide by current divisor
        }
    }

    return `About ${Math.round(age)} years ${ageName}.`;                        // If got through them all, must be years old.
}

module.exports = function(msg, args) {
    let member = msg.guild.member(msg.mentions.users.first()) || msg.member;
    let user = member.user;

    const userEmbed = {
        color: 0x0099ff,
        title: `Information About ${member.displayName}`,
        author: {
            name: `${user.username}#${user.discriminator}`,
            icon_url: user.displayAvatarURL(),
        },
        thumbnail: {
            url: user.displayAvatarURL(),
        },
        fields: [
            {
                name: user.presence.status == 'online' ? '✅ Online' : '❌ Offline',
                value: '\u200b',
            },
            {
                name: '🕹 Playing...',
                value: user.presence.activities.length == 0 ? "Not currently playing a game.\n" : `${user.presence.activities[0]}\n`,
            },
            {
                name: '\n\u200b\n🤖 Bot Check',
                value: user.bot ? "Beep Boop, this user is a bot!\n\u200b" : "This user is a human...\n\u200b",
            },
            {
                name: 'Joined the Server',
                value: getAgeString(member.joinedTimestamp, false),
                inline: true,
            },
            {
                name: 'Account Created',
                value: getAgeString(user.createdAt, true),
                inline: true,
            },
        ],
        timestamp: new Date(),
        footer: {
            text: `Requested by ${msg.member.displayName}`,
            icon_url: msg.member.user.displayAvatarURL(),
        },
    };

    msg.channel.send({ embed: userEmbed });
}