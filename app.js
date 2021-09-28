const Discord = require('discord.js');  
const fetch = require('node-fetch');    
const fs = require('fs');
require('dotenv').config();

const channels = {}

const client = new Discord.Client();
const link = process.env.LINK;
client.login(process.env.BOTTOKEN);

function readyDiscord(){
    console.log(`Hello I am a bot ${client.user.tag}`);
}

client.on('ready',readyDiscord);

client.on("guildMemberAdd", (member) => {
  console.log(member.id, member.user);
});

async function gotMessage(msg){
    console.log(msg.content);    
    if(msg.content === 'hello'){
        msg.channel.send('Hello! I am Ajax Bot ❤🎂\n\n;;help likh ab');
    }
    else if(msg.content === ';;help'){
        msg.channel.send('This is your Bday Bot! U can type the following commands :\n\n1. ;;happybirthday\n2. ;;memories\n3. ;;play person_name\n\nPerson list is \n1. aditya\n2. archeel\n3. abhishek\n4. mehdi\n5. pratik\n6. pratikjain\n7. piyush\n8. prem\nIt is not case sensitive par naam same dalna\n\n4. ;;artist\n5. ;;unnati\n6. ;;developers')
    }
    else if(msg.content === ';;gif'){
        // let search = 'friends'; 
        // let trending = `https://g.tenor.com/v1/trending?key=${process.env.TENORKEY}`
        // let url = `https://g.tenor.com/v1/search?q=${search}&key=${process.env.TENORKEY}&limit=8`
        // let response = await fetch(url);
        // let json =  await response.json();
        // console.log(json);
        const files = fs.readdirSync('./gif');
        let i = 0;
        console.log('hi');
        const interval = setInterval(() => {
            msg.channel.send('Sending a gif', {
                files: [
                    `./gif/${files[i]}`
                ]
            });
            i += 1;
            if(i>=files.length)
                clearInterval(interval);
        }, 2000);
    }
    else if(msg.content === ';;memories'){
        const files = fs.readdirSync('./memories');
        let i = 0;
        console.log('hi');
        const interval = setInterval(() => {
            msg.channel.send('Sending a gif', {
                files: [
                    `./memories/${files[i]}`
                ]
            });
            i += 1;
            if(i>=files.length)
                clearInterval(interval);
        }, 5000);
    }
    else if(msg.content === ';;join') {
        if (msg.member.voice.channel) {
            const connection = await msg.member.voice.channel.join();
            channels[msg.member.voice.channel] = {connection}
        } else {
            msg.channel.send('Please Join A Voice Channel')
        }
    }
    else if(msg.content.startsWith(';;play')) {
        if (msg.member.voice.channel) {
            let args = msg.content.split(' ')[1];
            if(typeof args === 'undefined') {
                console.log("yahaaa")
                msg.channel.send('Please use proper syntax, i.e   ;;play person_name')
            }
            else{
                args = args.toLowerCase()
                if(typeof channels[msg.member.voice.channel] === 'undefined'){
                    console.log('lower')
                    const connection = await msg.member.voice.channel.join();
                    channels[msg.member.voice.channel] = {connection}
                }
                msg.channel.send(`Love from ${args} ❤`,{
                    files : [
                        `./Pics/${args}/${args}.jpg`
                    ]
                })
                const dispatcher = channels[msg.member.voice.channel].connection.play(fs.createReadStream(`./audios/${args}.mp3`));
                channels[msg.member.voice.channel] = {...channels[msg.member.voice.channel],dispatcher}
                dispatcher.on('start', () => {
                    console.log(`${args}.mp3 is now playing!`);
                });

                dispatcher.on('finish', () => {
                    console.log(`${args}.mp3 has finished playing!`);
                });

                // Always remember to handle errors appropriately!
                dispatcher.on('error', console.error);
            }
        } else {
            msg.channel.send('Please Join A Voice Channel')
        }
    }
    else if(msg.content === ';;leave'){
        channels[msg.member.voice.channel].connection.disconnect();
        delete channels[msg.member.voice.channel];
    }
    else if(msg.content === ';;pause'){
        if(channels[msg.member.voice.channel].dispatcher)
            channels[msg.member.voice.channel].dispatcher.pause()
        else {
            msg.channel.send('Please Join A Voice Channel')
        }
    }
    else if(msg.content === ';;unpause'){
        if(channels[msg.member.voice.channel].dispatcher)
            channels[msg.member.voice.channel].dispatcher.resume()
        else {
            msg.channel.send('Please Join A Voice Channel')
        }
    }
    else if(msg.content === ';;skip'){
        if(channels[msg.member.voice.channel].dispatcher)
            channels[msg.member.voice.channel].dispatcher.end()
        else {
            msg.channel.send('Please Join A Voice Channel')
        }
    }
    else if(msg.content === ';;artist'){
        msg.channel.send(`Kalakar AF\n`,{
            files : [
                './Pics/artist/artist1.jpg','./Pics/artist/artist2.jpg'
            ]
        })
    }
    else if(msg.content === ';;happybirthday'){
        const connection = await msg.member.voice.channel.join();
        channels[msg.member.voice.channel] = {connection};
        const dispatcher = channels[msg.member.voice.channel].connection.play(fs.createReadStream(`./audios/Hbd.mp3`));
        channels[msg.member.voice.channel] = {...channels[msg.member.voice.channel],dispatcher}
        dispatcher.on('start', () => {
            console.log(`hbd.mp3 is now playing!`);
        });

        dispatcher.on('finish', () => {
            console.log(`hbd.mp3 has finished playing!`);
        });

        // Always remember to handle errors appropriately!
        dispatcher.on('error', console.error);
    }
    else if(msg.content === ';;unnati'){
        const connection = await msg.member.voice.channel.join();
        channels[msg.member.voice.channel] = {connection};
        const dispatcher = channels[msg.member.voice.channel].connection.play(fs.createReadStream(`./audios/unnati.mp3`));
        channels[msg.member.voice.channel] = {...channels[msg.member.voice.channel],dispatcher}
        dispatcher.on('start', () => {
            console.log(`unnati.mp3 is now playing!`);
        });

        dispatcher.on('finish', () => {
            console.log(`unnati.mp3 has finished playing!`);
        });

        // Always remember to handle errors appropriately!
        dispatcher.on('error', console.error);
        msg.channel.send(`BHUL JAA USSE\nDUSRI MILEGI TEKO \n`,{
            files : [
                './Pics/unnati/unnati.jpg'
            ]
        })
    }
    else if(msg.content === ';;developers'){
        msg.channel.send(`BOHOT MEHNAT SE BANAYA HAI BHAI..\nI HOPE U LIKE IT❤❤`,{
            files : [
                './Pics/developers.jpg'
            ]
        })
    }
}

client.on('message',gotMessage);

