const Discord = require('discord.js');
const data = require('quick.db');

exports.run = async (client, message, args) => {
  if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply("<:trend:951918900717682718> Bu komutu kullanabilmek için \`Yönetici\` Yetkisine sahip olmalısın!");
  if(!message.mentions.channels.first()) return message.channel.send(new Discord.MessageEmbed().setColor('#00001').setTitle('').setDescription(' <:trend:951918900717682718> Bir kanal etiketlemeyi unuttunuz.'));
  let mentionChannel = message.mentions.channels.first();
  data.set(`jail.log.${message.guild.id}`, mentionChannel.id);
  message.channel.send(new Discord.MessageEmbed().setTitle('').setDescription(`<:trend:951918900717682718> Jail sistemi başarıyla açıldı. ${mentionChannel} kanalı olarak seçtiniz.`));

};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
}

exports.help = {
  name: 'jail-log'
};