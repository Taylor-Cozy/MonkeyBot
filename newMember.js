const Canvas = require('canvas');
const Discord = require('discord.js');

let images = [
    "https://images.pexels.com/photos/619418/pexels-photo-619418.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    "https://images.pexels.com/photos/1533060/pexels-photo-1533060.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    "https://images.pexels.com/photos/414144/pexels-photo-414144.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    "https://images.pexels.com/photos/33109/fall-autumn-red-season.jpg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
]

function applyText (canvas, text) {
    const ctx = canvas.getContext('2d');

    let fontSize = 70;

    do {
        ctx.font = `${fontSize -=10}px sans-serif`;
    } while (ctx.measureText(text).width > canvas.width - 300);

    return ctx.font;
}

module.exports = async function (member){
    
    const channel = member.guild.channels.cache.find(ch => ch.name === 'new-members');
    if(!channel) return;

    // Create a new canvas && Context is used to modify the canvas
    const canvas = Canvas.createCanvas(700, 250);
    const ctx = canvas.getContext('2d');

    // Wait for image to load, then fit image on to canvas, centred
    const index = Math.floor(Math.random() * 4);
    const background = await Canvas.loadImage(images[index]);
    var scale = Math.max(canvas.width / background.width, canvas.height/background.height);
    var x = (canvas.width / 2) - (background.width / 2) * scale;
    var y = (canvas.height / 2) - (background.height / 2) * scale;
    ctx.drawImage(background, x, y, background.width * scale, background.height * scale);

    // Select colour of stroke and then draw rectangle around picture
    ctx.strokeStyle = '#ffffff';
    ctx.shadowColor = '#000000';
    ctx.shadowBlur = 10;
    ctx.lineWidth = 10;
    ctx.strokeRect(0,0,canvas.width,canvas.height);



    // Draw Username Text
    ctx.fillStyle = '#ffffff';
    ctx.shadowColor = '#000000';
    ctx.shadowBlur = 2;
    ctx.shadowOffsetX = 5;
    ctx.shadowOffsetY = 5;
    ctx.font = '30px sans-serif';
    ctx.fillText('Welcome to the server,', canvas.width/2.5, canvas.height/2.5);
    ctx.font = applyText(canvas, `${member.displayName}!`);
    ctx.fillText(`${member.displayName}!`, canvas.width/2.5, canvas.height/1.5);

    // Make a circle for the pp to sit on
    ctx.beginPath();
    ctx.arc(125,125,100,0,Math.PI * 2, true); // 25 + 200/2 = centre of image, image radius is 100
    ctx.closePath();
    ctx.clip(); // clip the region drawn on to use on image

    // Wait for the canvas to load an image then draw it on to the canvas
    const avatar = await Canvas.loadImage(member.user.displayAvatarURL({format: 'jpg'}));
    ctx.drawImage(avatar, 25, 25, 200, 200);

    const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'welcome-image.png');

    channel.send(`Welcome to the server, ${member}!`, attachment);
    
}