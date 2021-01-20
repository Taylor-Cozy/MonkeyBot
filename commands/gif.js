const fetch = require('node-fetch');

module.exports = async function(msg, args) {
    let keyword = 'monkey';
    if(args.length > 0){
        keyword = args.join(" ");
    }

    let url = `https://api.tenor.com/v1/search?q=${keyword}&key=${process.env.TENORKEY}&contentfilter=off`;
    let response = await fetch(url);
    let json = await response.json();

    let index = Math.floor(Math.random() * json.results.length);

    msg.channel.send(json.results[index].url);
}