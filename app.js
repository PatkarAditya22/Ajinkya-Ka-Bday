const Discord = require('discord.js');
const client = new Discord.Client();      

require('dotenv').config();

const link = process.env.LINK;

client.login(process.env.BOTTOKEN);

function readyDiscord(){
    console.log(`Hello I am a bot ${client.user.tag}`);
}

client.on('ready',readyDiscord);

function gotMessage(msg){
    console.log(msg.content);
    if(msg.channel.id == '828874861740425226'){
        if(msg.content === 'hello'){
            msg.channel.send('Hello! I am Ajax Bot ❤🎂🎉');
        }
        if(msg.content === ';;help'){
            msg.channel.send('This is your Bday Bot! U can type the following commands : [;;happybirthday,;;memories]')
        }
    }
}

client.on('message',gotMessage);

