const { EpicFreeGames } = require('epic-free-games');
const fs = require('fs'); 
const { Webhook, MessageBuilder } = require('discord-webhook-node');

const epicFreeGames = new EpicFreeGames({ country: 'US', locale: 'en-US', includeAll: true });

let gamelist = [];
let hook = null;
const webhookUrl = process.env.WEBHOOK_URL;
if (!webhookUrl) {
  throw new Error("WEBHOOK_URL environment variable not set.");

}
hook = new Webhook(webhookUrl);
hook.setAvatar("https://i.pcmag.com/imagery/articles/01vhCqYOCQxEuue1pmPtp5F-1..v1670432578.jpg");

epicFreeGames.getGames().then(res => {
  fs.readFile('ids.txt', 'utf-8', (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      return;
    }

    let idsInTextFile = data.split(/\r?\n/);

    for (let i = 0; i < res.currentGames.length; i++) {
      if (!(idsInTextFile.includes(res.currentGames[i].id))) {
        gamelist.push(res.currentGames[i]);
        console.log(res.currentGames[i].title)
      }
    }

    let seenIds = data;
    for (let game of gamelist) {
      seenIds += (game.id) + "\n";

      // console.log(game.keyImages[2]);
    }
    fs.writeFile('ids.txt', seenIds, (err) => {if (err) {console.log(err)}});
    let embeds = [];
    for (let game of gamelist) {
      let titleimg = "";
      for (img of game.keyImages) {
        if (img.type == 'OfferImageWide') {
          titleimg = img.url;
          break
        }
      }
      
      const embed = new MessageBuilder()
        // .setTitle(game.title)
        .setAuthor(game.title, '', `https://store.epicgames.com/en-US/p/${game.urlSlug}`)
        .addField("", game.description
          ? (game.description.length > 1024 ? game.description.slice(0, 1021) + "…" : game.description)
          : "No description", false)
        .setImage(titleimg)
        .setText(`@everyone ${game.title} is now free at https://store.epicgames.com/en-US/p/${game.urlSlug}`);
      
        // embeds.push(embed);
        hook.send(embed);
    }
    // hook.send(embeds);
  });
}).catch(err => {
  // Do something
});

