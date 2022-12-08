// https://beta.openai.com/docs/api-reference/introduction
// https://www.npmjs.com/package/chatgpt

import { WechatyBuilder } from "wechaty";
import qrcodeTerminal from "qrcode-terminal";
import { ChatGPTAPI } from 'chatgpt'

// init wechaty properties
const bot = WechatyBuilder.build({
    name: "wechat-unick",
    puppet: 'wechaty-puppet-wechat',
    puppetOptions: {
        uos: true 
    },
    profile: 'unickcheng',
});

// connect to chatGPT via session
const api = new ChatGPTAPI({ sessionToken: process.env.SESSION_TOKEN });
await api.ensureAuth();

async function says(room, message) {
    if (room) {
        await room.say(message);
    } else {
        await contact.say(message);
    }
}
async function replay(room, contact, content) {

    if (content.startsWith('/ping')) {
        says(room, `pong`);
        return;
    }
    if (content.startsWith('/ai ')) {
        says(room, `@${contact.name()} I have received the request, please wait for a moment.`);
        try {
            const response = await api.sendMessage(content.replace('/ai ', ''));
            says(room, `@${contact.name()} ${response}`);
        } catch (e) {
            console.error(e);
            says(room, `Sorry @${contact.name()} openai request failure`);
        }
        return;
    } 
    await says(room, `@${contact.name()} this command is not supported !!!`);
}

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
async function onMessage(message) {
    const contact = message.talker();
    const content = message.text();
    const room = message.room();

    if ( message.self() || message.type() !== bot.Message.Type.Text ) {
        return;
    } else if (content.startsWith('/')) {
        return replay(room, contact, content);
    }
}

// start execution

bot
    .on('scan', onScan)
    .on('login', onLogin)
    .on('logout', onLogout)
    .on('message', onMessage);

bot
    .start()
    .then(() => console.log('Starting Login ...'))
    .catch((e) => console.error(e));
  