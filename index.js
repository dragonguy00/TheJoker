const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const token = process.env.token;
const bot = new Discord.Client({disableEveryone: true});

bot.on("ready", async () => {
  console.log(`${bot.user.username} is online!`);

  bot.user.setActivity("Arkham Network", {type: "Playing"});

});

bot.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);
  let botchannel = message.guild.channels.find(`name`, "bot-commands")
  let user = message.guild.member(message.author);

if (cmd === `${prefix}fleader`) {

  //<fleader <IGN> <Faction> <Faction Disord>

  let recruitmentchannel = message.guild.channels.find(`name`, "faction-recruitment")
  let recruitmentRchannel = message.guild.channels.find(`name`, "faction-leader-requests")
  let fLeaderRole = message.guild.roles.find(`name`, "Faction Leader");
  let pflRole = message.guild.roles.find(`name`, "Pending FL Request");

  if (message.channel.name === 'bot-commands') {

    if(message.member.roles.find(`name`, "Faction Leader")) {
      message.delete().catch(O_o=>{});
      return message.channel.send(`<@${user.id}>, you already have the Faction Leader role! Start requesting new members in ${recruitmentchannel}.`);
    }
    else if(message.member.roles.find(`name`, "Pending FL Request")) {
      message.delete().catch(O_o=>{});
      return message.channel.send(`<@${user.id}>, you already have a pending faction leader role request! You will be notified when a decision has been made.`);
    }
    else {

      let user3 = message.guild.member(message.author);

    let ign = args[0];
      message.delete().catch(O_o=>{});
    if(!ign) return message.channel.send(`<@${message.author.id}>, you didn't state all the information required when submiting a Faction Leader Role request! Esure you follow the command: ${prefix}fleader <ign> <faction name> <faction discord>.`);

    let faction = args[1];
      message.delete().catch(O_o=>{});
    if(!faction) return message.channel.send(`<@${message.author.id}>, you didn't state all the information required when submiting a Faction Leader Role request! Esure you follow the command: ${prefix}fleader <ign> <faction name> <faction discord>.`);

    let fDiscord = args[2];
      message.delete().catch(O_o=>{});
    if(!fDiscord) return message.channel.send(`<@${message.author.id}>, you didn't state all the information required when submiting a Faction Leader Role request! Esure you follow the command: ${prefix}fleader <ign> <faction name> <faction discord>.`);

    let user = message.guild.member(message.author);

    let fLeaderEmbed = new Discord.RichEmbed()
    .setTitle(`Faction Leader Role Request`)
    .setColor("#9017a5")
    .setAuthor(`${message.author.username}`, message.author.displayAvatarURL)
    .setDescription(`The following is a request for the Faction Leader role. Before approving the request, ensure they meet the requirements:\n\n __The leader of an Established Faction:__\n❖ Multiple active members\n❖ Have a faction discord server\n❖ Playing the current map\n\n If the above requirements are met, add another ✅ below. If you add this emoji, the user will automatically be PM'd by the bot saying that they have gotten the role and it will be given to them too. Adding another ❌ below, will result in the bot PM'ing the user, saying they have been unsuccesful in receiving the role.`)
    //and run the following command so the user is PM'd via the bot saying they have been given the roles: *,addflrole @user*
    .setThumbnail("https://i.imgur.com/Kv9ZcHX.png")
    .addField("Submitted By", `${message.author}`, true)
    .addField("IGN", ign, true)
    .addField("Faction Name", faction, true)
    .addField("Faction Discord (Optional)", fDiscord, true)
    .setTimestamp()
    .setFooter(`This message is generated by ${bot.user.username}.`, bot.user.displayAvatarURL);

    message.delete().catch(O_o=>{});
    message.channel.send(`<@${user.id}>, you have successfully submitted a Faction Leader Role request. You will be notified when and if, you have received the role via PM (from <@${bot.user.id}>).`);

    let msg2 = await recruitmentRchannel.send(fLeaderEmbed);

    await msg2.react(`✅`);
    await msg2.react(`❌`);
    await msg2.react(bot.emojis.get("455268058643038208"))

    user3.addRole(pflRole.id);

  // bot.on('messageReactionAdd', (reaction, user) => {
  //     if(reaction.emoji.name === "✅") {
  //       user3.removeRole(pflRole.id);
  //       user3.addRole(fLeaderRole.id);
  //       return user3.send(`Congratulations, you have been given the ${fLeaderRole.name} role on the ArkhamNetwork Discord Server!`);
  //     }
  //     else if (reaction.emoji.name === "❌") {
  //       user3.removeRole(pflRole.id);
  //       return user3.send(`Sorry, your request for the ${fLeaderRole.name} role on the ArkhamNetwork Discord Server has been declined.`);
  //     }
  // });

  // bot.on('messageReactionRemove', (reaction, user) => {
  //     if(reaction.emoji.name === "✅") {
  //       user3.removeRole(fLeaderRole.id);
  //     }
  //     else if (reaction.emoji.name === "❌") {
  //       return;
  //     }
  // });

  bot.on('messageReactionAdd', (reaction, user) => {
    if (user.bot) return
    console.log(reaction.emoji.toString());

    if (reaction.emoji.toString() === "✅") {
      user3.removeRole(pflRole.id);
      user3.addRole(fLeaderRole.id);
      message.guild.member(message.author).send(`Congratulations, you have been given the ${fLeaderRole.name} role on the ArkhamNetwork Discord Server!`);
    }
    else if (reaction.emoji.toString() === "❌") {
      user3.removeRole(pflRole.id);
      user3.removeRole(fLeaderRole.id);
      message.guild.member(message.author).send(`Sorry, your request for the ${fLeaderRole.name} role on the ArkhamNetwork Discord Server has been **denied**.`)
    }
  });


  bot.on('messageReactionRemove', (reaction, user) => {
    if (user.bot) return
    console.log(reaction.emoji.toString());

    if (reaction.emoji.toString() === "✅") {
      user3.removeRole(fLeaderRole.id);
      message.guild.member(message.author).send(`Sorry, your request for the ${fLeaderRole.name} role on the ArkhamNetwork Discord Server was accidently accepted, it has since been **denied**.`)
    }
    else if (reaction.emoji.toString() === "❌") {
      return
    }
  });

  }
  }
  else {
    message.delete().catch(O_o=>{});
    return message.channel.send(`Sorry, you can only use that command in ${botchannel}!`);
    }
  }


if (cmd === `${prefix}help`) {
//${message.author.username}
const collector = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, { time: 60000 });


    if (message.channel.name === 'bot-commands') {
            message.channel.send(`Hey, <@${user.id}>! \n \n**What section of the Network do you require assistance with?** \n*Reply with __one__ of the following: Forums, In-Game, Discord or Forms (Need help with a transaction, reporting a rule breaker, appeal a punishment or reporting a bug?).*`);

            collector.on('collect', message => {
              let input = message.content.toLowerCase();

              if (input === "forums") {
               message.channel.send(`**What aspect of the forums do you need assistance with?**\nThe three most common queries are listed below. If your query is not stated below, contact one of our staff members (a list can be loacted by running !stafflist).\n\n     **1)** Syncing my In-Game account to my Forums account.\n     **2)** Changing my DOB &/ name on the Forums.\n     **3)** Reporting a user who broke the forum rules.\n\n*Reply with either "1", "2" or "3".*`)

                  collector.on('collect', message => {
                   let input2 = message.content.toLowerCase();

                    if (input2 === "1"){
                      return message.channel.send(`__**To link your In-Game and Forum accounts, do the following:**__\n    1) Ensure you are logged into your forum account on your main browser.\n    2) Log into Arkham in-game.\n    3) Run the command "/syncaccount".\n    4) You'll be presented with a one-time use link. Click it to open it in your main browser.\n    5) You should receive a message saying you are successfully linked, sporting your IGN and skin across the page.\n\nAfter a successful sync, you'll start to see the default minotar skull showing up. You'll be instantly able to claim your supporter /gkit in-game. The forum's sync cron entry runs every 15 minutes, so it should only take 15 minutes at most for your actual skull & all the other details to automatically show up.`);
                      return;
                    }
                    else if (input2 === "2"){
                      message.channel.send(`__**To change your date of birth and or name on the forums, read the following:**__\nTo get these settings altered on your forums account, you will be required to get an Administrator with the permissions to change it. However, a quick and easy way of doing this is commenting on Cloud's thread @ http://arkhamnetwork.org/community/threads/forum-name-birthdate-change-requests.83055/.`)
                      return;
                    }
                    else if (input2 === "3"){
                      message.channel.send(`__**If a user has broken one of the forum rules, do the following:**__\nTo report a user for breaking a forum rule(s), contact a Moderator+ via a forum conversation, or @tag them on the thread. From here, the staff member will deal with the user, issuing a warning point(s) and merge / delete the post.`)
                      return;
                    }

                 })

               return;
             }
             else if (input === "in-game") {
               message.channel.send(`**What aspect of the server do you need assistance with?**\nThe three most common queries are listed below. If your query is not stated below, select 4, if it is still not answered, contact one of our staff members (a list can be loacted by running !stafflist).\n\n     **1)** I'm unable to connect to the server!\n     **2)** I've lost [In-game item], how can I get it back?\n     **3)** What are Vote Credits?\n     **4)** Other. \n\n*Reply with either "1", "2", "3" or "4"*`)

               collector.on('collect', message => {
                let input3 = message.content.toLowerCase();

                 if (input3 === "1"){
                   return message.channel.send(`__**If you are unable to connect to the server, try the following:**__\n    If you are unable to join as you are receiving either of the following error messages:\n\n    ❖ Can't resolve host name or Cannot connect to server - Try connecting to the server using a different IP such as beepboop.qc.to or gtacraft.me\n\n    ❖ Java. Socketexception: Network unreachable - As a result of Coelho's bypass, this error isn't as common. However, if you do encounter it, try connecting via a different IP address / MC version. If you are still unable to connect to the server, try connecting through SquidHQ, downloadable @ squidhq.com.`);
                   return;
                 }
                 else if (input3 === "2"){
                   message.channel.send(`__**If you have lost an item, read the following:**__\In-game items are sadly non-refundable. However, if you lose an item such as an Omnitool on Prison, and you have proof of it, then there is a possibility of receiving it back if the Administrators see it as sufficient proof.\n\n__**An item vanished from my inventory / I got scammed!**__\nUnfortunately, in-game items are *non-refundable*. If you purchased an item and it got scammed, there is also sadly nothing that can be done - this is not IRL scamming (Which would result in the offending user being banned). IRL scamming is purchasing an item for someone and they don't give their part of the deal in-game.`)
                   return;
                 }
                 else if (input3 === "3"){
                   message.channel.send(`__**Wondering what vote credits are? Read the following:**__\nVote Credits are __one__ of the rewards obtained from voting. When claiming votes, you will be credited both a Vote Key(s) and Vote Credits. You will be able to use these credits via /creditshop on revamped gamemodes, where you are able to purchase global items, such as ranks, as well as gamemode-specific items, such as a Private mine on Prison.`)
                   return;
                 }
                 else if (input3 === "4") {
                   message.channel.send(`Here is a list of other commonly asked questions related to in-game information, features and usage. If your question isn't answered below, contact one of our staff members (a list can be loacted by running !stafflist).\n\n__**How to I equip, change and font my title?**__\nTo equip a title you have won or purchased, do /title. This will bring up the title GUI where you will be able to select a title to equip. If you currently have a title equipped, selecting another title will remove it and apply the newly selected title. To change the font of your title, do /titlecolor. From here, you will be able to change the font of it.`)
                   return;
                 }

              })

            return;
             }
             else if (input === "discord") {
               message.channel.send(`Hey ${message.author.username}, here is a list of commonly asked questions related to __${input}__ information, features and usage. If your question isn't answered below, contact one of our staff members (a list can be loacted by running !stafflist).\n\n__**How do I receive my donator rank on Discord?**__\n If your forum and MC account are already synced, skip step one.\n\n    1) Syncing your forum account - The first step in obtaining your donator rank on discord is to sync your in-game account to your forum account. To do this, simply run /syncaccount while in-game and click on the message prompt in chat. You will be able to verify that your in-game account has synced to your forum account by going onto your profile page. On there, you should notice your donator rank tag/ title and a unique donator rank banner for your rank.\n\n    2) Discord Integration - The next rank to obtaining your donator rank is to associate your forum account to your discord account. To do this, go to the 'External Accounts' setting on your forums account (http://arkhamnetwork.org/community/account/external-accounts). Click on the 'Associate with Discord' button then sign into your discord account. Once you have done this, you will be asked to allow ArkhamNetwork to be able to access certain information about you, such as your email address and what discord servers your're in. If you are ready to allow it to do so, click the 'Authorize' button.`)

               return;
             }
             else if (input === "forms") {
               message.channel.send(`**What aspect of the forms (on the Forums) do you need assistance with?**\nThe three most common queries are listed below. If your query is not stated below, select 4, if it is still not answered, contact one of our staff members (a list can be loacted by running !stafflist).\n\n     **1)** How to I report a rule breaker?\n     **2)** How do I appeal a punishment?\n     **3)** I haven't receieved/ lost a purchased good, help!\n     **4)** Other. \n\n*Reply with either "1", "2", "3" or "4"*`)

               collector.on('collect', message => {
               let input4 = message.content.toLowerCase();

               if (input4 === "1"){
                 message.channel.send(`__**Looking to report a user for breaking the rules?**__\nYou are able to submit a Player Report at http://arkhamnetwork.org/community/forums/player-reports.6/. However, before you submit a report, ensure you read the submission guidelines at http://arkhamnetwork.org/community/threads/how-to-properly-report-rule-breakers.83042/.\n\nIf you wish to __report a staff member__, as you believe they have abused their powers or is doing their job incorrectly, get proof (such as a screenshot or video), then report it to a Admin+ via forums conversation or Discord DM. You are able to get a list of all the Admins+ via running !stafflist. Then, enter the name of Admin+ beside 'Participants:'. All Admins+ are listed on the Official Staff List Logs, linked above.`);
                 return;
                }
                else if (input4 === "2"){
                  message.channel.send(`__**Want to appeal a punishment?**__\nYou are able to appeal both in-game and discord punishments via the same form! You are able to do so at http://arkhamnetwork.org/community/forms/punishment-appeal-form.1/respond, where a member of the Ban Team will sort it. If you are looking to appeal a chargeback ban, also do so at the link provided above, and a Ban Team member will move it to the chargeback ban appeals section to be sorted by MrSneakyGuy.`)
                  return;
                }
                  else if (input4 === "3"){
                message.channel.send(`__**Haven't received a purchase, or lost a purchased rank?**__\nTo receive a purchase back or one that you have't received, you will be required to submit a purchase help at http://arkhamnetwork.org/community/index.php?forms/purchase-help.3/respond. Note, if you believe you have lost your donator rank, check /titlerank to check if still have the rank title. If you don't, then do so as stated.`)
                  return;
                }
                else if (input4 === "4") {
                  message.channel.send(`Here is a list of other commonly asked questions related to in-game information, features and usage. If your question isn't answered below, contact one of our staff members (a list can be loacted by running !stafflist).\n\n__**Found a bug? Report it!**__\nIf you have found a bug, report it via the following form http://arkhamnetwork.org/community/forms/bug-report.6/respond. Ensure you provide as much information as possible to better assist out DEVs in getting this bug fixed!\n\n__**Have an idea for a new feature for the Network?**__\nSubmit your ideas via the suggestions form (http://arkhamnetwork.org/community/forms/suggestions-form.8/respond), to receieve community feedback, and ultimately staff feedback to see if your idea could one day be implemented onto the server, forums or discord! However, make sure you read the suggestions guide first at http://arkhamnetwork.org/community/threads/official-suggestions-guide.83072/.`)
                  return;
                }

               return;
              })
             }
             // else {
             //   return message.channel.send("Sorry, you didn't specify a valid section of the Network!");
             // }

           //}
           });
        }
      else {
        return message.channel.send(`Sorry, you can only use that command in ${botchannel}!`);
        }

}

if (cmd === `${prefix}forumshelp`) {

const collector = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, { time: 60000 });

  if (message.channel.name === 'bot-commands') {
    message.channel.send(`**What aspect of the forums do you need assistance with?**\nThe three most common queries are listed below. If your query is not stated below, contact one of our staff members (a list can be loacted by running !stafflist).\n\n     **1)** Syncing my In-Game account to my Forums account.\n     **2)** Changing my DOB &/ name on the Forums.\n     **3)** Reporting a user who broke the forum rules.\n\n*Reply with either "1", "2" or "3".*`)

       collector.on('collect', message => {
        let input2 = message.content.toLowerCase();

         if (input2 === "1"){
           return message.channel.send(`__**To link your In-Game and Forum accounts, do the following:**__\n    1) Ensure you are logged into your forum account on your main browser.\n    2) Log into Arkham in-game.\n    3) Run the command "/syncaccount".\n    4) You'll be presented with a one-time use link. Click it to open it in your main browser.\n    5) You should receive a message saying you are successfully linked, sporting your IGN and skin across the page.\n\nAfter a successful sync, you'll start to see the default minotar skull showing up. You'll be instantly able to claim your supporter /gkit in-game. The forum's sync cron entry runs every 15 minutes, so it should only take 15 minutes at most for your actual skull & all the other details to automatically show up.`);
           return;
         }
         else if (input2 === "2"){
           message.channel.send(`__**To change your date of birth and or name on the forums, read the following:**__\nTo get these settings altered on your forums account, you will be required to get an Administrator with the permissions to change it. However, a quick and easy way of doing this is commenting on Cloud's thread @ http://arkhamnetwork.org/community/threads/forum-name-birthdate-change-requests.83055/.`)
           return;
         }
         else if (input2 === "3"){
           message.channel.send(`__**If a user has broken one of the forum rules, do the following:**__\nTo report a user for breaking a forum rule(s), contact a Moderator+ via a forum conversation, or @tag them on the thread. From here, the staff member will deal with the user, issuing a warning point(s) and merge / delete the post.`)
           return;
         }

      })

    return;

      }
    else {
      return message.channel.send(`Sorry, you can only use that command in ${botchannel}!`);
      }
}

if (cmd === `${prefix}in-gamehelp`) {

const collector = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, { time: 60000 });

  if (message.channel.name === 'bot-commands') {
    message.channel.send(`**What aspect of the server do you need assistance with?**\nThe three most common queries are listed below. If your query is not stated below, select 4, if it is still not answered, contact one of our staff members (a list can be loacted by running !stafflist).\n\n     **1)** I'm unable to connect to the server!\n     **2)** I've lost [In-game item], how can I get it back?\n     **3)** What are Vote Credits?\n     **4)** Other. \n\n*Reply with either "1", "2", "3" or "4"*`)

    collector.on('collect', message => {
     let input3 = message.content.toLowerCase();

      if (input3 === "1"){
        return message.channel.send(`__**If you are unable to connect to the server, try the following:**__\n    If you are unable to join as you are receiving either of the following error messages:\n\n    ❖ Can't resolve host name or Cannot connect to server - Try connecting to the server using a different IP such as beepboop.qc.to or gtacraft.me\n\n    ❖ Java. Socketexception: Network unreachable - As a result of Coelho's bypass, this error isn't as common. However, if you do encounter it, try connecting via a different IP address / MC version. If you are still unable to connect to the server, try connecting through SquidHQ, downloadable @ squidhq.com.`);
        return;
      }
      else if (input3 === "2"){
        message.channel.send(`__**If you have lost an item, read the following:**__\nIn-game items are sadly non-refundable. However, if you lose an item such as an Omnitool on Prison, and you have proof of it, then there is a possibility of receiving it back if the Administrators see it as sufficient proof.\n\n__**An item vanished from my inventory / I got scammed!**__\nUnfortunately, in-game items are *non-refundable*. If you purchased an item and it got scammed, there is also sadly nothing that can be done - this is not IRL scamming (Which would result in the offending user being banned). IRL scamming is purchasing an item for someone and they don't give their part of the deal in-game.`)
        return;
      }
      else if (input3 === "3"){
        message.channel.send(`__**Wondering what vote credits are? Read the following:**__\nVote Credits are __one__ of the rewards obtained from voting. When claiming votes, you will be credited both a Vote Key(s) and Vote Credits. You will be able to use these credits via /creditshop on revamped gamemodes, where you are able to purchase global items, such as ranks, as well as gamemode-specific items, such as a Private mine on Prison.`)
        return;
      }
      else if (input3 === "4") {
        message.channel.send(`Here is a list of other commonly asked questions related to in-game information, features and usage. If your question isn't answered below, contact one of our staff members (a list can be loacted by running !stafflist).\n\n__**How to I equip, change and font my title?**__\nTo equip a title you have won or purchased, do /title. This will bring up the title GUI where you will be able to select a title to equip. If you currently have a title equipped, selecting another title will remove it and apply the newly selected title. To change the font of your title, do /titlecolor. From here, you will be able to change the font of it.`)
        return;
      }

   })

  return;

      }
    else {
      return message.channel.send(`Sorry, you can only use that command in ${botchannel}!`);
      }
}

if (cmd === `${prefix}discordhelp`) {

  if (message.channel.name === 'bot-commands') {
        message.channel.send(`Hey ${message.author.username}, here is a list of commonly asked questions related to discord information, features and usage. If your question isn't answered below, contact one of our staff members (a list can be loacted by running !stafflist).\n\n__**How do I receive my donator rank on Discord?**__\n If your forum and MC account are already synced, skip step one.\n\n    1) Syncing your forum account - The first step in obtaining your donator rank on discord is to sync your in-game account to your forum account. To do this, simply run /syncaccount while in-game and click on the message prompt in chat. You will be able to verify that your in-game account has synced to your forum account by going onto your profile page. On there, you should notice your donator rank tag/ title and a unique donator rank banner for your rank.\n\n    2) Discord Integration - The next rank to obtaining your donator rank is to associate your forum account to your discord account. To do this, go to the 'External Accounts' setting on your forums account (http://arkhamnetwork.org/community/account/external-accounts). Click on the 'Associate with Discord' button then sign into your discord account. Once you have done this, you will be asked to allow ArkhamNetwork to be able to access certain information about you, such as your email address and what discord servers your're in. If you are ready to allow it to do so, click the 'Authorize' button.`)

        return;
      }
    else {
      return message.channel.send(`Sorry, you can only use that command in ${botchannel}!`);
      }
}

if (cmd === `${prefix}formshelp`) {

const collector = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, { time: 60000 });

  if (message.channel.name === 'bot-commands') {
    message.channel.send(`**What aspect of the forms (on the Forums) do you need assistance with?**\nThe three most common queries are listed below. If your query is not stated below, select 4, if it is still not answered, contact one of our staff members (a list can be loacted by running !stafflist).\n\n     **1)** How to I report a rule breaker?\n     **2)** How do I appeal a punishment?\n     **3)** I haven't receieved/ lost a purchased good, help!\n     **4)** Other. \n\n*Reply with either "1", "2", "3" or "4"*`)

    collector.on('collect', message => {
    let input4 = message.content.toLowerCase();

    if (input4 === "1"){
      message.channel.send(`__**Looking to report a user for breaking the rules?**__\nYou are able to submit a Player Report at http://arkhamnetwork.org/community/forums/player-reports.6/. However, before you submit a report, ensure you read the submission guidelines at http://arkhamnetwork.org/community/threads/how-to-properly-report-rule-breakers.83042/.\n\nIf you wish to __report a staff member__, as you believe they have abused their powers or is doing their job incorrectly, get proof (such as a screenshot or video), then report it to a Admin+ via forums conversation or Discord DM. You are able to get a list of all the Admins+ via running !stafflist. Then, enter the name of Admin+ beside 'Participants:'. All Admins+ are listed on the Official Staff List Logs, linked above.`);
      return;
     }
     else if (input4 === "2"){
       message.channel.send(`__**Want to appeal a punishment?**__\nYou are able to appeal both in-game and discord punishments via the same form! You are able to do so at http://arkhamnetwork.org/community/forms/punishment-appeal-form.1/respond, where a member of the Ban Team will sort it. If you are looking to appeal a chargeback ban, also do so at the link provided above, and a Ban Team member will move it to the chargeback ban appeals section to be sorted by MrSneakyGuy.`)
       return;
     }
       else if (input4 === "3"){
     message.channel.send(`__**Haven't received a purchase, or lost a purchased rank?**__\nTo receive a purchase back or one that you have't received, you will be required to submit a purchase help at http://arkhamnetwork.org/community/index.php?forms/purchase-help.3/respond. Note, if you believe you have lost your donator rank, check /titlerank to check if still have the rank title. If you don't, then do so as stated.`)
       return;
     }
     else if (input4 === "4") {
       message.channel.send(`Here is a list of other commonly asked questions related to in-game information, features and usage. If your question isn't answered below, contact one of our staff members (a list can be loacted by running !stafflist).\n\n__**Found a bug? Report it!**__\nIf you have found a bug, report it via the following form http://arkhamnetwork.org/community/forms/bug-report.6/respond. Ensure you provide as much information as possible to better assist out DEVs in getting this bug fixed!\n\n__**Have an idea for a new feature for the Network?**__\nSubmit your ideas via the suggestions form (http://arkhamnetwork.org/community/forms/suggestions-form.8/respond), to receieve community feedback, and ultimately staff feedback to see if your idea could one day be implemented onto the server, forums or discord! However, make sure you read the suggestions guide first at http://arkhamnetwork.org/community/threads/official-suggestions-guide.83072/.`)
       return;
     }

    return;
   })

      }
    else {
      return message.channel.send(`Sorry, you can only use that command in ${botchannel}!`);
      }
}

});

bot.on("guildMemberAdd", (member) => {
let guild = member.guild;
let dInfo = guild.channels.find(`name`, "discord-information");
let dRules = guild.channels.find(`name`, "discord-rules");
let welcomeCnl = guild.channels.find(`name`, "welcome")

if(guild.systemChannel){
	welcomeCnl.send(new Discord.RichEmbed()
	.setColor("#55ffee")
  .setTitle(`Welcome to **Arkham's Discord**, ${member.user.username}!`)
	.setDescription(`Enjoy your stay, ${member.user}! \n\n ↠ IP: arkhamnetwork.org \n ↠ Website: https://arkhamnetwork.org \n ↠ Store: https://buy.arkhamnetwork.org \n\n ↠ Discord Info: ${dInfo} \n ↠ Discord Rules: ${dRules}`)
	.setThumbnail(`https://i.imgur.com/Kv9ZcHX.png`)
  .setTimestamp()
  .setFooter(`Total Users: ${member.guild.memberCount}`));
  }
});

bot.login(token);
