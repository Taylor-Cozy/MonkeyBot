const replies = [
    '🐵🍌💘',
    'Reject Humanity, Return to Monke',
    'Ooh Ooh AAHHH AHHHHH AAHHHHH',
    'Uh oh, stinky! 🙊'
]

module.exports = function(msg, args) {
    msg.react('🐵');
    const index = Math.floor(Math.random() * replies.length);
    msg.channel.send(replies[index]);
}