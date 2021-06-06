const Discord = require("discord.js");
const moment = require("moment-timezone");
module.exports = {
  name: "setmsg",
  category: "settings",
  args: true,
  botPermission: [
    "VIEW_CHANNEL",
    "EMBED_LINKS",
    "ATTACH_FILES",
    "MANAGE_CHANNELS",
    "MANAGE_GUILD"
  ],
  authorPermission: [
    "VIEW_CHANNEL",
    "EMBED_LINKS",
    "ATTACH_FILES",
    "MANAGE_CHANNELS",
    "MANAGE_GUILD"
  ],
  usage: "setmsg <welcome/leave/level> <msg>",
  description: "Set the welcome",
  run: async (client, message, args) => {
    let keys = ["welcome", "leave", "level"];
    let welcomes = [
      "{member}",
      "{username}",
      "{tag}",
      "{server}",
      "{size}",
      "{date}",
      "{position}"
    ];
    let leaves = [
      "{member}",
      "{username}",
      "{tag}",
      "{server}",
      "{size}",
      "{date}",
      "{position}"
    ];
    let levels = [
      "{member}",
      "{username}",
      "{tag}",
      "{server}",
      "{level}",
      "{orl_level}",
      "{xp}",
      "{orl_xp}"
    ];
    var date = moment.tz("Asia/Jakarta");
    let joinPosition;
    const me = message.guild.members.cache.array();
    me.sort((a, b) => a.joinedAt - b.joinedAt);
    for (let i = 0; i < me.length; i++) {
      if (me[i].id == message.guild.member(message).id) joinPosition = i;
    }

    const key = await client.awaitReply(
      message,
      `**Choose what settings you want?\nKey: ${keys.join(
        " |"
      )}\nType \`cancel\` to stop setup**`,
      180000,
      true
    );
    if (!key)
      return message.channel.send("No response was given, Exiting setup...");
    if (key.content === "cancel")
      return message.channel.send("Exiting setup...");

    //Setup
    if (key.content === "welcome") {
      let welcome = await client.awaitReply(
        message,
        `**Please give a message to welcomer?\nCode: ${welcomes.join(
          " |"
        )}\nType \`cancel\` to stop setup**`,
        180000,
        true
      );
      if (welcome.content === "cancel")
        return message.channel.send("Exiting setup...");

      client.data.set(`welmsg_${message.guild.id}`, welcome.content);
      client.send(
        `**Done** From now on I will send\n\`${
          welcome.content
        }\`\n\nView:\n${welcome.content
          .split(`{member}`)
          .join(message.author) // Member mention substitution
          .split(`{username}`)
          .join(message.author.username) // Username substitution
          .split(`{position}`)
          .join(joinPosition || 1) //member.guild.members.cache.size)
          .split(`{tag}`)
          .join(message.author.tag) // Tag substitution
          .split(`{date}`)
          .join(date.format("DD/MMM/YYYY, hh:mm:ss z")) // member guild joinedAt
          .split(`{server}`)
          .join(message.guild.name) // Name Server substitution
          .split(`{size}`)
          .join(message.guild.members.cache.size)}`
      );
    }
  }
};

/*
    const [key, ...value] = args;
    switch (key) {
      default:
        return message.channel.send(
          new Discord.MessageEmbed()
            .setColor("RED")
            .setTimestamp()
            .setFooter(
              message.author.tag,
              message.author.displayAvatarURL({ dynamic: true }) ||
                client.user.displayAvatarURL({ dynamic: true })
            )
            .setDescription("Error: Invalid Key provided, Please try again.")
        );
      case "leave":
        {
          const msg = args.slice(1).join(" ");
          if (!msg) {
            return message.channel.send(
                `${client.emotes.error}\`Please give a message to welcomer ^(Must include ({member},{username},{tag},{server},{size},{date},{position}) for this to work!)^\``
              )
              .then(m => m.delete({ timeout: 80000 }).catch(e => {}));
          }
          client.data.set(`levmsg_${message.guild.id}`, msg);
          const lev = new Discord.MessageEmbed()
            .setDescription(`**Done** From now on I will send\n\`${msg}\``)
            .setColor("RED");
          message.channel.send(lev);
        }
        break;
      case "welcome":
        {
          const msg = args.slice(1).join(" ");
          if (!msg) {
            return message.channel.send(
                `${client.emotes.error}\`Please give a message to welcomer ^(Must include ({member},{username},{tag},{server},{size},{date},{position}) for this to work!)^\``
              )
              .then(m => m.delete({ timeout: 80000 }).catch(e => {}));
          }

          client.data.set(`welmsg_${message.guild.id}`, msg);
          const wel = new Discord.MessageEmbed()
            .setDescription(`**Done** From now on I will send\n\`${msg}\``)
            .setColor("RED");
          message.channel.send(wel);
        }
        break;
      case "inviter": {
        const msg = args.slice(1).join(" ");
        if (!msg) {
          return message.channel
            .send(
              `${client.emotes.error}\`Please give a message to welcomer ^(Must include ({user:username},{user:mention},{user:tag},{inviter:mention},{inviter:tag},{inviter:username},{inviter:total},{inviter:code}) for this to work!)^\``
            )
            .then(m => m.delete({ timeout: 80000 }).catch(e => {}));
        }

        db.set(`inviter_${message.guild.id}`, msg);
        const wel = new Discord.MessageEmbed()
          .setDescription(`**Done** From now on I will send\n\`${msg}\``)
          .setColor("RED");
        message.channel.send(wel);
      }
    }
  }
};
*/
