const { MessageEmbed } = require('discord.js');

exports.run = async (client, message, args) => {
    if (!message.member.hasPermission("ADMINGISTRATOR")) return message.channel.send(new MessageEmbed().setDescription(`<a:carp:937503051495911444> Bu komutu kullanabilmek için \`Üyeleri Yasakla\` yetkisine sahip olmalısın!`))
    let user = args[0];
    const banList = await message.guild.fetchBans();
    if (!user || isNaN(user) || !banList.has(user)) {
        return message.channel.send(new MessageEmbed().setDescription(`<a:carp:937503051495911444> Kullanıcı id hatalı veya kullanıcı yasaklı değil!`))
    }
    message.guild.members.unban(user);
    message.channel.send(new MessageEmbed().setDescription(`<a:saritik:942852350480093264> idli kullanıcının yasağı kaldırıldı. `))
};

exports.conf = {
    aliases: ["un-ban"]
};

exports.help = {
    name: 'unban'
};