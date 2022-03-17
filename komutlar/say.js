const Discord = require("discord.js");

module.exports.run = async (client, message, args,) => {

  const voiceChannels = message.guild.channels.cache.filter(c => c.type === "voice");
  let count = 0;

  for (const [id, voiceChannel] of voiceChannels)
  count += voiceChannel.members.size;
  const embed = new Discord.MessageEmbed()
  .setColor("BLACK")
  .setAuthor(`${message.guild.name}`)
  .setDescription(
    `**Ses kanallarında \`${count}\` kişi bulunmaktadır!**
    \n**Sunucuda \`${message.guild.memberCount}\` kişi bulunmaktadır!**
    \n**Sunucudaki Çevrimiçi Sayısı:** \`${message.guild.members.cache.filter(x => x.user.presence.status === 'online').size}\`
    \n**Sunucudaki Rahatsız Etme Sayısı:** \`${message.guild.members.cache.filter(x => x.user.presence.status === 'dnd').size}\`
    \n**Sunucudaki Boşta Sayısı:** \`${message.guild.members.cache.filter(x => x.user.presence.status === 'idle').size}\`
    \n**Sunucudaki Çevrimdışı Sayısı:** \`${message.guild.members.cache.filter(x => x.user.presence.status === 'offline').size}\`
    \n**Sunucudaki Bot Sayısı:** \`${message.guild.members.cache.filter(m => m.user.bot).size}\``) 

   
    message.channel.send(embed);

};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["total", "toplamüye", "toplamkişi", "totalmember"],
  permLevel: 0
};
exports.help = {
  name: "say",
  description: "- ",
  usage: "say"
};