const Discord = require('discord.js');

const low = require('lowdb');

const FileSync = require('lowdb/adapters/FileSync');

var antispam = require("anti-spam");

const client = new Discord.Client();

const adapter = new FileSync('database.json');
const db = low(adapter);

db.defaults({ histoires: [], xp: []}).write()

var prefix = "*";

const queue = new Map();

var servers = {};

client.login("NTM2MjUzOTk5Mjg0NzQ4Mjk4.DyUBRA.GbGlalsyj-uVUvAtLPpiNfO7ToQ");

client.on("ready", () => {

    console.log("Je suis prêt !");
    client.user.setGame('Turtle - *aide - 52.687 Serveurs', 'https://twitch.tv/mkadev33');
})

client.on('message', async message => { 

    if(message.content === "Turtle"){
        message.reply("Merci d'utiliser le bot Turtle");
        console.log('A fait la commande Turtle');
    }

    if(message.content === "TG turtle"){
        message.reply("Heuuu Tu te tape la honte.... ");
        console.log('A fait la commande TG Turtle');
    }

    if(message.content === prefix + "aide") {
        var help_embed = new Discord.RichEmbed()
        .setColor('#40A497')
        .setTitle("Voici mes commandes d'aides :")
        .setDescription("Je suis le bot *Turtle Voici mes commandes disponible !")
        .addField("*aide", "Affiche les commandes du bot")
        .addField("*image", "Voir la listes de toutes les images en gifs")
        .addField("*stats", "Voir la listes de tes stats discord")
        .addField("*mod", "Informations sur le commandes admin")
        .setFooter("Menu - bot *Turtle")
        message.channel.send(help_embed);
        console.log("Un utilisateur a effectué la commande d'aide");
    }


    if(message.content === prefix + "mod") {
        var help_embed = new Discord.RichEmbed()
        .setColor('#40A497')
        .setTitle("Voici mes commandes de modérations :")
        .setDescription("Je suis le bot *Turtle Voici mes commandes disponible !")
        .addField("*ban", "Ban l'utilisateur ( *ban @.... )")
        .addField("*kick", "Kick l'utilisateur ( *kick @.... )")
        .addField("*mute", "Mute l'utilisateur ( *mute @...)")
        .addField("*unmute", "Démute l'utilisateur ( *unmute @...)")
        .setFooter("Menu - bot *Turtle")
        message.channel.send(help_embed);
        console.log("Un utilisateur a effectué la commande mod");
    }


    if(message.content === prefix + "image") {
        var help_embed = new Discord.RichEmbed()
        .setColor('#40A497')
        .setTitle("Voici mes commandes pour afficher les images :")
        .addField("*dog", "*dog Affiche des images de chien :dog:")
        .addField("*cat", "*cat Affiche des images de chat :cat:")
        .addField("*divers", "*divers Affiche plein d'images diverse et varier :dividers:")
        .setFooter("Menu - bot *Turtle")
        message.channel.send(help_embed);
        console.log("Un utilisateur a effectué la commande image");
    }
    
    if(message.content === prefix + "27271310") {
        var help_embed = new Discord.RichEmbed()
        .setColor('#40A497')
        .setTitle("Partenariat Duck-Keys")
        .addField("Bonjour, nous sommes en partenariat avec duck-keys.fr qui héberge des serveurs de jeux. Alors ?? va faire un tour ;)")
        .addField("Site Web : https://duck-keys.fr")
        .addField("Discord : http://discord.duck-keys.fr")
        .setFooter("Duck-Keys.fr - Partenariat")
        message.channel.send(help_embed);
        console.log("Un utilisateur a effectué la commande partenariat");
    }

if (!message.content.startsWith(prefix)) return;

    var args = message.content.substring(prefix.length).split(" ");

    switch (args[0].toLowerCase()) { 

        case "stats":

        var userCreateDate = message.author.createdAt.toString().split(" ");
        var msgauthor = message.author.id;

        var stats_embed = new Discord.RichEmbed()
        .setColor("#6699FF")
        .setTitle(`Statistiques du joueurs : ${message.author.username}`)
        .addField(`ID du joueurs :id:`, msgauthor, true)
        .addField(`Date d'inscription du joueur :`, userCreateDate[1] + ' ' + userCreateDate[2] + ' ' + userCreateDate[3])
        .setThumbnail(message.author.avatarURL)
        message.reply("Tu peux regarder tes messages privés !")
        message.author.send(stats_embed);

        break;
        
    }



    if(message.content === prefix + "info") {
        var info_embed = new Discord.RichEmbed()
        .setColor("#40A497")
        .setTitle("Voici les informations sur moi et le serveur !")
        .addField(" :robot: Nom :", `${client.user.tag}`, true)
        .addField("Détenteur du bot :hash:", `#${client.user.discriminator}`)
        .addField("ID :id: ", `${client.user.id}`)
        .addField("Nombre de membres", message.guild.members.size)
        .addField("Nombre de catégories et de salons", message.guild.channels.size)
        .setFooter("Menu - bot *Turtle")
        message.channel.sendMessage(info_embed)
        console.log("Un utilisateur a effectué la commande d'info !")
    }

    if(message.content.startsWith(prefix + "ban")) {
        if(!message.guild.member(message.author).hasPermission("BAN_MEMBERS")) return message.channel.send("Vous n'avez pas la perission");

        if(message.mentions.users.size === 0) {
            return message.channel.send(":x: Vous devez mentionner un utilisateur");
        }

        var ban = message.guild.member(message.mentions.users.first());
        if(!ban) {
            return message.channel.send(":x: Je ne sais pas si l'utilisateur existe");
        }

        if(!message.guild.member(client.user).hasPermission("BAN_MEMBERS")) {
            return message.channel.send(":x: Je n'ai pas la permission pour ban");
        }
        ban.ban().then(member => {
            message.channel.send(`${member.user.username} est ban par ${message.author.username} :exclamation:`)
        });
        
    }

    if(message.content.startsWith(prefix + "mute")) {
        if(!message.guild.member(message.author).hasPermission("ADMINISTRATOR")) return message.channel.send("Vous n'avez pas la permission:exclamation:");

        if(message.mentions.users.size === 0) {
            return message.channel.send(':x: Vous devez mentionner un utilisateur:exclamation:');
        }

        var mute = message.guild.member(message.mentions.users.first());
        if(!mute) {
            return message.channel.send(":x: Je n'ai pas trouvé l'utilisateur ou il l'existe pas:exclamation:");
        }

        if(!message.guild.member(client.user).hasPermission("ADMINISTRATOR")) return message.channel.send("Je n'ai pas la permission:exclamation:");
        message.channel.overwritePermissions(mute, { SEND_MESSAGES: false}).then(member => {
            message.channel.send(`${mute.user.username} est mute:exclamation:`);
        });
    }

    if(message.content.startsWith(prefix + "unmute")) {
        if(!message.guild.member(message.author).hasPermission("ADMINISTRATOR")) return message.channel.send("Vous n'avez pas la permission:exclamation:");

        if(message.mentions.users.size === 0) {
            return message.channel.send(':x: Vous devez mentionner un utilisateur:exclamation:');
        }

        var mute = message.guild.member(message.mentions.users.first());
        if(!mute) {
            return message.channel.send(":x: Je n'ai pas trouvé l'utilisateur ou il l'existe pas:exclamation:");
        }

        if(!message.guild.member(client.user).hasPermission("ADMINISTRATOR")) return message.channel.send("Je n'ai pas la permission:exclamation:");
        message.channel.overwritePermissions(mute, { SEND_MESSAGES: true}).then(member => {
            message.channel.send(`${mute.user.username} n'est plus mute:exclamation:`);
        });
    }   
    
    if(message.content.startsWith(prefix + "dog")) {

        var dog = [

            "https://media.giphy.com/media/ygCJ5Bul73NArGOSFN/giphy.gif",
            "https://media.giphy.com/media/mCRJDo24UvJMA/giphy.gif",
            "https://media.giphy.com/media/fpXxIjftmkk9y/giphy.gif",
            "https://media.giphy.com/media/LfCt1sR1VweBy/giphy.gif",
            "https://media.giphy.com/media/26FPqut4lzK3AECEo/giphy.gif",
            "https://media.giphy.com/media/Y4pAQv58ETJgRwoLxj/giphy.gif",
            "https://media.giphy.com/media/3lxD1O74siiz5FvrJs/giphy.gif",
            "https://media.giphy.com/media/14rtlR7b01cjQI/giphy.gif",
            "https://media.giphy.com/media/xTiTnf9SCIVk8HIvE4/giphy.gif"
        ];

        var gif = dog[Math.floor(Math.random() * dog.length)];

        var dog_embed = new Discord.RichEmbed()
        .setColor('RANDOM')
        .setTitle(':dog: Dog :')
        .setImage(gif)
        .setFooter('Turtle - Images.gif')
        message.channel.send(dog_embed);
        console.log("Un utilisateur a effectué la commande image dog");


    }

    
    if(message.content.startsWith(prefix + "cat")) {

        var cat = [

            "https://media.giphy.com/media/mlvseq9yvZhba/giphy.gif",
            "https://media.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif",
            "https://media.giphy.com/media/SRO0ZwmImic0/giphy.gif",
            "https://media.giphy.com/media/nNxT5qXR02FOM/giphy.gif",
            "https://media.giphy.com/media/WXB88TeARFVvi/giphy.gif",
            "https://media.giphy.com/media/GFHJXPCoVQEec/giphy.gif",
            "https://media.giphy.com/media/ND6xkVPaj8tHO/giphy.gif",
            "https://media.giphy.com/media/xBAreNGk5DapO/giphy.gif",
            "https://media.giphy.com/media/B7ppUExX92PjW/giphy.gif"
        ];

        var gif = cat[Math.floor(Math.random() * cat.length)];

        var dog_embed = new Discord.RichEmbed()
        .setColor('RANDOM')
        .setTitle(':cat: Cat:')
        .setImage(gif)
        .setFooter('Turtle - Images.gif')
        message.channel.send(dog_embed);
        console.log("Un utilisateur a effectué la commande image cat");


    }
   
    
    if(message.content.startsWith(prefix + "divers")) {

        var divers = [

            "https://media.giphy.com/media/26tP3M3i03hoIYL6M/giphy.gif",
            "https://media.giphy.com/media/a9A3HLylBz2yA/giphy.gif",
            "https://media.giphy.com/media/aw6iRYg9JeGcM/giphy.gif",
            "https://media.giphy.com/media/13zw0akcDQkvnO/giphy.gif",
            "https://media.giphy.com/media/LdQeQHraf3ThK/giphy.gif",
            "https://media.giphy.com/media/EJIFaXV55556M/giphy.gif",
            "https://media.giphy.com/media/3oKIPmUUz1MT9u3UA0/giphy.gif",
            "https://media.giphy.com/media/oqbkWDL2MvRcY/giphy.gif",
            "https://media.giphy.com/media/3o85xzgG29iCuiBujS/giphy.gif",
            "https://media.giphy.com/media/2vlC9FMLSmqGs/giphy.gif",
            "https://media.giphy.com/media/1TZcHxWqmBpf2/giphy.gif",
        ];

        var gif = divers[Math.floor(Math.random() * divers.length)];

        var dog_embed = new Discord.RichEmbed()
        .setColor('RANDOM')
        .setTitle(':dividers: Divers:')
        .setImage(gif)
        .setFooter('Turtle - Images.gif')
        message.channel.send(dog_embed);
        console.log("Un utilisateur a effectué la commande image divers");

    }


            
});
