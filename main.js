const { decryptMedia } = require('@open-wa/wa-automate')
const  flood  = require('./src/flood')
const  banner  = require('./src/banner')
const wa = require('@open-wa/wa-automate')  

fulltime = new Date()
hora = fulltime.getHours()
minutos = fulltime.getMinutes()

wa.create().then(bot => start(bot))

function start(bot) {
    bot.onMessage(async message => {
        console.log(message)
        try{
            if (message.body === '$debug') {
                if (message.sender.id == '557488562578@c.us') {
                    await bot.reply(message.chat.id, `\`\`\`[200] - OK 🤖 ✔️ \`\`\``, message.id)
                }
                else {
                    await bot.reply(message.chat.id, `\`\`\`[404] - Proibido ❌ \`\`\``, message.id)
                    await setTimeout(() => {
                        bot.sendText('557488562578@c.us', `*${message.sender.pushname}* | _${message.sender.id.replace('@c.us', '')}_ - Tentou usar o _debuger_ sem permissão 🤖`)
                    
                    }, 1000);
                }
            }

            //criador
            if (message.body === '!criador') {
                await bot.sendContact(message.chat.id, '557488562578@c.us')
                await setTimeout(() => {
                    bot.sendText(message.chat.id, `\`\`\`[${String(hora).padStart('2', '0')}:${String(minutos).padStart('2', '0')}]\`\`\` - Aqui está o contato do meu criador`)
                }, 500);
                //debug
                await bot.sendText('557488562578', `\`\`\`[${String(hora).padStart('2', '0')}:${String(minutos).padStart('2', '0')}]\`\`\` - Seu contato foi solicitado`)
            }

            // send sticker
            if (message.type == 'image') {
                if (message.caption == '!sticker') {
                    await bot.sendReplyWithMentions(message.chat.id, `\`\`\`[${String(hora).padStart('2', '0')}:${String(minutos).padStart('2', '0')} - Solicitado por ${message.sender.pushname}\`\`\` \n\nAguarde...⌛`, message.id)
                    const imagem = await decryptMedia(message)
                    const sticker = `data:${message.mimetype};base64,${imagem.toString('base64')}`
                    await bot.sendImageAsSticker(message.chat.id, sticker)

                    await setTimeout(() => {
                        bot.sendText('557488562578@c.us', `\`\`\`[${String(hora).padStart('2', '0')}:${String(minutos).padStart('2', '0')}]\`\`\` - *${message.sender.pushname}* | _${message.sender.id.replace('@c.us', '')}_ - Gerou uma figurinha 🤖`)
                    }, 1000);
                }
            }

            else if (message.type == 'video'){
                if (message.caption == '!sticker') {
                    await bot.sendReplyWithMentions(message.chat.id, `\`\`\`[400] - Indisponível ❌\`\`\``)

                    await setTimeout(() => {
                        bot.sendText('557488562578@c.us', `\`\`\`[${String(hora).padStart('2', '0')}:${String(minutos).padStart('2', '0')}]\`\`\` - *${message.sender.pushname}* | _${message.sender.id.replace('@c.us', '')}_ - Tentou gerar uma figurinha com vídeo 🤖`)
                    }, 1000);
                }
            }

            if (message.body == '!sticker') {
                try {
                    if (message.quotedMsg.type == 'image') {
                        await bot.sendReplyWithMentions(message.chat.id, `\`\`\`[${String(hora).padStart('2', '0')}:${String(minutos).padStart('2', '0')} - Solicitado por ${message.sender.pushname}\`\`\` \n\nAguarde...⌛`, message.id)
                        const dp1 = await decryptMedia(message.quotedMsg)
                        const sticker1 = `data:${message.quotedMsg.mimetype};base64,${dp1.toString('base64')}`
                        await bot.sendImageAsSticker(message.from, sticker1)

                        await setTimeout(() => {
                            bot.sendText('557488562578@c.us', `\`\`\`[${String(hora).padStart('2', '0')}:${String(minutos).padStart('2', '0')}]\`\`\` - *${message.sender.pushname}* | _${message.sender.id.replace('@c.us', '')}_ - Tentou gerar uma figurinha com vídeo 🤖`)

                        }, 1000);
                    }
                }
                catch(e) {
                    await bot.sendText(message.chat.id, `[ *${String(hora).padStart('2', '0')}:${String(minutos).padStart('2', '0')}* ] Metadados error ❌\n\n${e}`)
                }
            }
            
            //help
            if (message.body == '_!help'){
                await bot.reply(message.chat.id, banner.banner(), message.id)
                await setTimeout(() => {
                    bot.sendText('557488562578@c.us', `\`\`\`[${String(hora).padStart('2', '0')}:${String(minutos).padStart('2', '0')}]\`\`\` - *${message.sender.pushname}* | _${message.sender.id.replace('@c.us', '')}_ - Commands: _!help_ 🤖`)
                })
            }

            //flood
            if (message.body == '_!flood'){
                await bot.sendText(message.chat.id, flood.flood(), message.id)
                await setTimeout(() => {
                    bot.sendText('557488562578@c.us', `\`\`\`[${String(hora).padStart('2', '0')}:${String(minutos).padStart('2', '0')}]\`\`\` - *${message.sender.pushname}* | _${message.sender.id.replace('@c.us', '')}_ > Flood ativo`)
                }, 1000);
            }

            // impropes
            lista = []

            for (var xingamento in lista) {
                if (message.body.includes(`${lista[xingamento]}`)){
                    await bot.reply(message.chat.id, 
                        `█████████
█▄█████▄█
█▼▼▼▼▼▼
█   ${message.body}
█▲▲▲▲▲▲
█████████
  ██ ██`, message.id
                    )
                    await setTimeout(() => {
                        bot.sendText('557488562578@c.us', `\`\`\`[${String(hora).padStart('2', '0')}:${String(minutos).padStart('2', '0')}]\`\`\` - *${message.sender.pushname}* | _${message.sender.id.replace('@c.us', '')}_ > Xingamento no grupo!`)

                    }, 1000);
                }
            }

            // all mentions
            if (message.chat.isGroup == true){
                num = message.chat.groupMetadata.participants
                for (membros in num) {
                    if (message.body === '!all') {
                        admin = num[membros]['isAdmin']
                        ids = num[membros]['id']
                        grupo = message.chat.name
                        total = message.chat.participantsCount
                        if (admin == true){ 
                            if (message.sender.id == ids){
                                userList = []
                                for (usuarios in num){
                                    users = num[usuarios]['id']
                                    newUser = users.replace('@c.us', '')
                                    userList.push(`› *@${newUser.replace(',', '')}*\n`)
                                }
                                listString = userList.toString()
                                await bot.sendReplyWithMentions(message.chat.id, `--------〘 _TODOS MENCIONADOS_ 〙 --------\n\n \`\`\`[${String(hora).padStart('2', '0')}:${String(minutos).padStart('2', '0')}]\`\`\` ➣ *${grupo}*\n ➣ *${total} Membros*\n\n ${listString}`, message.id)
                                
                                await setTimeout(() => {
                                    //debug
                                    bot.sendText('557488562578@c.us', `\`\`\`[${String(hora).padStart('2', '0')}:${String(minutos).padStart('2', '0')}]\`\`\` - *${message.sender.pushname}* | _${message.sender.id.replace('@c.us', '')}_ - Todos mencionados no grupo 🤖`)
    
                                }, 10000);
                            }  
                        }
                    }
                }
            }

            else {   
                //debug 
                await setTimeout(() => {
                    bot.sendText('557488562578@c.us', `\`\`\`[${String(hora).padStart('2', '0')}:${String(minutos).padStart('2', '0')}]\`\`\` - *${message.sender.pushname}* | _${message.sender.id.replace('@c.us', '')}_ - $ Interação no pv: 🤖\n\n\n _Mensagem:_ \`\`\`${message.body}\`\`\``)
                
                }, 1000);
            }

        }
        catch{
            //debug
            await setTimeout(() => {
                bot.sendText('557488562578@c.us', `\`\`\`[${String(hora).padStart('2', '0')}:${String(minutos).padStart('2', '0')}]\`\`\` - O meu código teve algum erro 🤖`)
            }, 1000);
        }
    })

    // Boas vindas
    const groupChatId = "120363040678895413@g.us";
    bot.onParticipantsChanged(
        groupChatId,
        async (changeEvent) => {
            try{
                if (changeEvent.action == "add") {
                    await bot.sendTextWithMentions(groupChatId, `Bem vindo, *@${changeEvent.who.replace('@c.us', '')}*`)
                    await setTimeout(() => {
                        bot.sendText('557488562578@c.us', `\`\`\`[${String(hora).padStart('2', '0')}:${String(minutos).padStart('2', '0')}]\`\`\` - Alguem entrou no grupo 🤖`)
                        
                    }, 1000);
                }
                if (changeEvent.action == "remove") {
                    await bot.sendText(groupChatId, '👋 Menos um')
                    await setTimeout(() => {
                        bot.sendText('557488562578@c.us', `\`\`\`[${String(hora).padStart('2', '0')}:${String(minutos).padStart('2', '0')}]\`\`\` - Alguem saiu do grupo 🤖`)
                        
                    }, 10000);
                }
            }
            catch{
                await setTimeout(() => {
                    bot.sendText('557488562578@c.us', `\`\`\`[${String(hora).padStart('2', '0')}:${String(minutos).padStart('2', '0')}]\`\`\` - O meu código teve algum erro 🤖`)
                }, 1000);
            }
        }
    )
}
