require("dotenv").config();

const { Client, GatewayIntentBits, Partials, WebhookClient } = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildMembers,
  ],
  partials: [Partials.Message, Partials.Reaction, Partials.Channel],
});

const webhookClient = new WebhookClient({
  id: process.env.WEBHOOK_ID,
  token: process.env.WEBHOOK_TOKEN,
});

const PREFIX = "$";

client.on("ready", () => {
  console.log(`${client.user.tag} has logged in.`);
});

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;
  if (message.content.startsWith(PREFIX)) {
    const [CMD_NAME, ...args] = message.content
      .trim()
      .substring(PREFIX.length)
      .split(/\s+/);

    if (CMD_NAME === "kick") {
      if (!message.member.permissions.has("KickMembers"))
        return message.reply("You do not have permissions to use that command");
      if (args.length === 0) return message.reply("Please provide an ID");
      const member = message.guild.members.cache.get(args[0]);
      if (member) {
        member
          .kick()
          .then(() => message.channel.send(`${member.user.tag} was kicked.`))
          .catch(() => message.channel.send("I cannot kick that user :("));
      } else {
        message.channel.send("That member was not found");
      }
    } else if (CMD_NAME === "ban") {
      if (!message.member.permissions.has("BanMembers"))
        return message.reply("You do not have permissions to use that command");
      if (args.length === 0) return message.reply("Please provide an ID");
      try {
        await message.guild.members.ban(args[0]);
        message.channel.send("User was banned successfully");
      } catch (err) {
        console.error(err);
        message.channel.send(
          "An error occurred. Either I do not have permissions or the user was not found"
        );
      }
    } else if (CMD_NAME === "announce") {
      const msg = args.join(" ");
      webhookClient.send(msg);
    }
  }
});

client.on("messageReactionAdd", (reaction, user) => {
  const { name } = reaction.emoji;
  const member = reaction.message.guild.members.cache.get(user.id);
  if (reaction.message.id === "738666523408990258") {
    switch (name) {
      case "🍎":
        member.roles.add("1333422640811085865");
        break;
      case "🍌":
        member.roles.add("1333422640811085865");
        break;
      case "🍇":
        member.roles.add("1333422640811085865");
        break;
      case "🍑":
        member.roles.add("1333422640811085865");
        break;
    }
  }
});

client.on("messageReactionRemove", (reaction, user) => {
  const { name } = reaction.emoji;
  const member = reaction.message.guild.members.cache.get(user.id);
  if (reaction.message.id === "1333422640811085865") {
    switch (name) {
      case "🍎":
        member.roles.remove("1333422640811085865");
        break;
      case "🍌":
        member.roles.remove("1333422640811085865");
        break;
      case "🍇":
        member.roles.remove("1333422640811085865");
        break;
      case "🍑":
        member.roles.remove("1333422640811085865");
        break;
    }
  }
});

client.login(process.env.DISCORDJS_BOT_TOKEN);
