import inquirer from "inquirer";
import chalkAnimation from "chalk-animation";
import DiscordModal from 'discord-modal';
import {Client,MessageEmbed} from 'discord.js';
import { createSpinner } from "nanospinner";
import Database from "st.db";
import ms from 'ms';
import express from 'express';
import synchronizeSlashCommands from './util/SyncCommands.mjs'
import commandResponse from './util/commandResponse.mjs'
const app = express()
const questions_db = new Database({path:"./util/questions.yml"})
const users_applys_db = new Database({path:"./util/users_applys.yml"})
const config_db = new Database({
  path:"./util/config.yml",
  encryption: {
    password:process.env["REPLIT_DB_URL"]
  }
})




app.get("/", (req, res) => {
 res.send("Bot and website started!")
})




await getStarted()
async function getStarted(){
  if(await config_db.has({key:`config`}) == true) return await startBot()
  const rainbow = chalkAnimation.karaoke("Lặng nhìn Eto quay gót đi mãi");
  setTimeout(async()=> {
     rainbow.stop()
     const ask1 = await inquirer.prompt({
       name:"token_bot",
       type:'password',
       message:`Đặt token vào đây :`,
       mask:"*"
     })
     const ask2 = await inquirer.prompt({
       name:"owernid",
       type:'input',
       message:`ID tài khoản discord của bạn`,
     })
     const ask3 = await inquirer.prompt({
       name:"status_bot",
       type:'input',
       message:`Nhập hoạt động mà bạn muốn`,
     })
     const ask4 = await inquirer.prompt({
       name:"status_type",
       type:'list',
       message:`Choose the type of bot status`,
       choices:[
         "PLAYING","LISTENING","WATCHING","COMPETING"
       ]
     })
     await config_db.set({
       key:`config`,
       value:{
         token_bot:ask1.token_bot.replaceAll("\\","").replaceAll("~",""),
         owernid:ask2.owernid.replaceAll("\\","").replaceAll("~",""),
         status_bot:ask3.status_bot.replaceAll("\\","").replaceAll("~",""),
         status_type:ask4.status_type.replaceAll("\\","").replaceAll("~","")
       }
     })
     return await startBot()
  },3500)
} 


async function startBot(){
  console.clear()
  const spinner = createSpinner(`Đang tải...`).start()
  const client = new Client({intents: ['GUILDS', 'GUILD_MESSAGES']})
  const config = await config_db.get({key:`config`})
  client.login(config.token_bot).then(()=>{
    spinner.update({ text: 'Đang khởi động bot...' })
  }).catch(()=>{

    spinner.error({ text: 'Token bot không hợp lệ' })
  })
  DiscordModal(client)
  client.on("ready",async()=>{
    await synchronizeSlashCommands(client)
    client.user.setActivity(config.status_bot, { type:config.status_type });
    let bot_invite_link = `https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot%20applications.commands`
    spinner.success({ text: `Đăng nhập với ${client.user.tag} (${client.user.id})`})
     app.get('/',(r, s) => {
       s.send({message:"Bot bởi Eto2112"})
      }).post('/',async(r, s) => {
        s.send({
          message:"Bot by Eto2112"
        })
        if(await config_db.has({key:`uptime`}) != true){
          console.log("\u001b[32m✔ \u001b[0mUptime has been done successfully")
          await config_db.set({key:`uptime`,value:true})
        }
      })
     .get("/invite", (req, res) => res.status(301).redirect(bot_invite_link))
     .listen(3000)
  })
  client.on(`interactionCreate`, async(interaction)=> await commandResponse(client,interaction,config))
  client.on("interactionTextInput",async(interaction)=>{
    if(interaction.customId.startsWith("opentextinput")){
      let customId = interaction.customId.split("-")[1]
      if(await questions_db.has({key:customId}) != true) return await interaction.reply({content:`:x:`,ephemeral:true})
      await interaction.deferReply({ephemeral:true})
      let data = await questions_db.get({key:customId})
      let time = ms(Date.now() - new Date(await users_applys_db.get({key:`time_${interaction.user.id}`})))
      let embed = new MessageEmbed() 
      .setTitle(data.name)
      .setColor('#2f3136')
      .setAuthor("Đơn được gửi bởi "+interaction.user.tag,interaction.user.avatarURL())
      .setThumbnail(interaction.user.avatarURL())
      .setFooter(`Eto đang deadline rồi huhu`)
      .addField(`Thời gian`, `${time}` || "0s")
      interaction.fields.forEach((field)=>{
        embed.addField(data.questions[+field.custom_id.split("_")[0]].label,`\`\`\`${field.value}\`\`\``,true)
      })
      await client.channels.cache.get(data.channellogId).send({embeds:[embed]}).then(async()=>{
        await interaction.editReply({content:`☑ Đơn đăng kí của bạn đã được gửi thành công`,ephemeral:true})
        await users_applys_db.set({key:`apply_${interaction.user.id}_${customId}`,value:true})
      }).catch(async()=>{
        await interaction.editReply({content:`❎ Không thành công gửi, vui lòng thử lại `,ephemeral:true})
      })
     }
  })
}