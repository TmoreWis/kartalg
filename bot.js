const Discord = require('discord.js');
const client = new Discord.Client({ disableMentions: 'everyone' });
const ayarlar = require('./ayarlar.json');
const logs = require("discord-logs");
const fs = require('fs');
const ms = require('ms');
const { Database } = require('nukleon');
const moment = require('moment');
require('./util/eventLoader')(client);

var prefix = ayarlar.prefix;

const log = message => {
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./komutlar/", (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});
client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};
client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};
client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.on('ready', () => {

  // Oynuyor Kısmı
  
      var actvs = [
        ``,
        ``, 
        ``
    ];
    
    client.user.setActivity(actvs[Math.floor(Math.random() * (actvs.length - 1) + 1)], { type: 'LISTENING' });
    setInterval(() => {
        client.user.setActivity(actvs[Math.floor(Math.random() * (actvs.length - 1) + 1)], { type: 'LISTENING'});
    }, 15000);
    
        //------------------------------------------------------------------------------------------------------------\\

        client.on("message", message => {
          if(message.content.toLowerCase() == "sa") 
          return message.channel.send(`${message.author}, Aleyküm Selam.`)
        });
        
        client.on("message", message => {
          if(message.content.toLowerCase() == "selam") 
          return message.channel.send(`${message.author}, Selam hoşgeldin.`)
        });
        
        client.on("message", message => {
          if(message.content.toLowerCase() == "merhaba") 
          return message.channel.send(`${message.author}, Merhaba hoşgeldin.`)
        });
        
        client.on("message", message => {
          if(message.content.toLowerCase() == "selamun aleyküm") 
          return message.channel.send(`${message.author}, Aleyküm Selam.`)
        });
        
        client.on("message", message => {
          if(message.content.toLowerCase() == "sea")
          return message.channel.send(`${message.author}, Aleyküm Selam.`)
        });
        
        client.on("message", message => {
          if(message.content.toLowerCase() == "slm") 
          return message.channel.send(`${message.author}, Selam hoşgeldin.`)
        });
  
        client.on("message", message => {
          if(message.content.toLowerCase() == "dc") 
          return message.channel.send(`${message.author}, https://discord.gg/9QKWQSAjtw`)
        });
  
  
        //------------------------------------------------------------------------------------------------------------\\

      console.log ('_________________________________________');
      console.log (`Kullanıcı İsmi     : ${client.user.username}`);
      console.log (`Sunucular          : ${client.guilds.cache.size}`);
      console.log (`Kullanıcılar       : ${client.users.cache.size}`);
      console.log (`Prefix             : ${ayarlar.prefix}`);
      console.log (`Durum              : Bot Çevrimiçi!`);
      console.log ('_________________________________________');
    
    });


client.elevation = message => {
  if (!message.guild) {
    return;
  }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};


client.login(ayarlar.token);

  /// botu sese sokma //
  client.on("ready", () => {
    client.channels.cache.get('942901702699417620').join();
  });

  client.on("message", msg => {
    let db = require('quick.db')
     let e = db.fetch(`reklamengel_${msg.guild.id}`)
    if(e === "aktif"){  
          const reklam = [".com", ".net", ".xyz", ".tk", ".pw", ".io", ".me", ".gg", "www.", "https", "http", ".gl", ".org", ".com.tr", ".biz", "net", ".rf.gd", ".az", ".party", "discord.gg",];
            if (reklam.some(word => msg.content.includes(word))) {
              try {
                if (!msg.member.hasPermission("BAN_MEMBERS")) {
                      msg.delete();
                             const batusuyar = new Discord.MessageEmbed()
    .setColor('RED')
    .setTitle("Reklam Engel Filtresi")
    .setDescription(`Sunucuda Reklam Engel Filtresi Açık Reklam Yapamazsın <@${msg.authorid}>`)
                             
        
                        return msg.channel.send(batusuyar).then(msg => msg.delete(3000));
       
     
      msg.delete(3000);                              
     
                }              
              } catch(err) {
                console.log(err);
              }
            }}
    else return;
        });

