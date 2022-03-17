const Discord = require('discord.js');
const data = require('quick.db');
const ms = require('ms');

exports.run = async (client, message, args) => {
const logChannel = await data.fetch(`jail.log.${message.guild.id}`);
const jailYetkili = await data.fetch(`jail.yetkilirole.${message.guild.id}`);
const karantinaRole = await data.fetch(`jail.karantinarole.${message.guild.id}`);
if(!logChannel) return;
if(!jailYetkili) return;
if(!karantinaRole) return;

const errorEmbed = new Discord.MessageEmbed()
.setColor('#00001');
const errorEmbed2 = new Discord.MessageEmbed()
.setTitle('');

if(!message.member.permissions.has(jailYetkili)) return message.channel.send(errorEmbed.setDescription(`${message.guild.roles.cache.get(muteYetkili)} Rolüne sahip olman gerekiyor.`));
if(!args[0]) return message.channel.send(errorEmbed.setTitle('').setDescription(`Kullanıcı etiketleyerek dener misin?`));

let member;
if(message.mentions.members.first()) {
member = message.mentions.members.first();
} else if(args[0]) {
member = message.guild.members.cache.get(args[0]);
if(!member) return message.channel.send(errorEmbed.setTitle('').setDescription(`Kullanıcı etiketleyerek dener misin?`));
}

if(message.author.id === member.id) return message.channel.send(new Discord.MessageEmbed().setColor('#9c5cb2').setTitle('Agaa beeeeeeeee!').setDescription(`O kadar yürekli olamazsın.. 🙄`))
if(member.permissions.has('ADMINISTRATOR')) return message.channel.send(errorEmbed2.setDescription('Yönetici bir kullanıcıya karışamam!'));

message.channel.send(new Discord.MessageEmbed().setTitle('').setDescription(`<:trend:951918900717682718> ${member} Kullanıcısını jail çıkarıldı!`));
member.roles.cache.forEach(s => member.roles.add(s.id));
member.roles.remove(karantinaRole);
message.guild.channels.cache.get(logChannel).send(new Discord.MessageEmbed().setColor('#00001').setTitle('Karantinadan Biri Çıktı')
.setDescription(`${member} Kullanıcısının tüm rolleri alındı!

${message.guild.roles.cache.get(karantinaRole)} Rolü alındı!`).setImage('')
.setFooter(`${message.author.username} Tarafından Jail çıkarıldı`, message.author.avatarURL() ? message.author.avatarURL({dynamic: true}) : '').setThumbnail(member.user.avatarURL() ? member.user.avatarURL({dynamic: true}) : ''))

};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['cezalı-çıkar', 'Cezalı'],
  permLevel: 0
}

exports.help = {
  name: 'unjail'
};