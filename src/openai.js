// https://beta.openai.com/docs/api-reference/introduction
// https://www.npmjs.com/package/openai
import { WechatyBuilder } from "wechaty";
import qrcodeTerminal from "qrcode-terminal";
import { Configuration, OpenAIApi } from "openai";

// read environment variables
import dotenv from "dotenv"
dotenv.config()

const bot = WechatyBuilder.build({
    name: "wechat-unick",
    puppet: 'wechaty-puppet-wechat',
    puppetOptions: {
        uos: true 
    },
    profile: 'unickcheng',
});

const configuration = new Configuration({
    organization: process.env.OPENAI_ORGANIZATION,
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);


function onScan(qrcode, status) {
    qrcodeTerminal.generate(qrcode);
    const qrcodeImageUrl = [
      'https://api.qrserver.com/v1/create-qr-code/?data=',
      encodeURIComponent(qrcode),
    ].join('');
  
    console.log(qrcodeImageUrl);
}

async function onLogin(user) {
    console.log(`Hello, ${user.name()}`);
}

async function onLogout(user) {
    console.log(`Goodbye, ${user.name()}`);
}

async function replay(contact, content) {
    
    if (content.startsWith('/ping ')) {
        await contact.say(`pong`);
        return;
    }
    if (content.startsWith('/ai ')) {
        try {
            const response = await openai.createCompletion({
                model: process.env.OPENAI_MODEL,
                prompt: content.replace('/ai ', ''),
              });
            await contact.say(`@${contact.name()}: ${response.data.choices[0].text}`);
        } catch (e) {
            console.error(e);
            await contact.say(`Sorry @${contact.name()} openai request failure`);
        }
        return;
    } 
    await contact.say(`@${contact.name()} this command is not supported !!!`);
}

async function onMessage(message) {
    const contact = message.talker();
    const content = message.text();
    const isText = message.type() === bot.Message.Type.Text;

    if ( message.self() || !isText) {
        return;
    } else {
        return replay(contact, content);
    }
}


bot
    .on('scan', onScan)
    .on('login', onLogin)
    .on('logout', onLogout)
    .on('message', onMessage);

bot
    .start()
    .then(() => console.log('Starting Login ...'))
    .catch((e) => console.error(e));
  