# ChatGPT For Wechat

## UPDATE 2023-01-15

This repository has been archived. There are already great projects to replace this old version.

- [wechat-chatgpt](https://github.com/fuergaosi233/wechat-chatgpt)
- [chatgpt-api](https://github.com/transitive-bullshit/chatgpt-api)

---

[![Build And Publish Docker](https://github.com/UNICKCHENG/ChatGPT-For-Wechat/actions/workflows/build-docker.yml/badge.svg)](https://github.com/UNICKCHENG/ChatGPT-For-Wechat/actions/workflows/build-docker.yml)

ChatGPT-For-Wechat is a project using wechaty/wechaty that aims to call interfaces such as ChatGPT from within WeChat. I don't intend this project to be limited to ChatGPT, just like OpenAI is not limited to ChatGPT, and there are many better projects that have already implemented this functionality and even integrated it into [WeChat open platform](https://openai.weixin.qq.com), [WeChat Mini Program](https://mp.weixin.qq.com), etc.

## 💖 List of Thanks

- Thanks to [wechaty/wechaty](https://github.com/wechaty/wechaty)'s solution for connecting to WeChat and [web protocol support](https://wechaty.js.org/2021/04/13/wechaty-uos-web/)
- Thanks to [OpenAI](https://openai.com/api/) for the [OpenAI API](https://beta.openai.com/docs/api-reference/introduction)  and [ChatGPT](https://openai.com/blog/chatgpt/)
- Thanks to all open source projects for sharing ideas and techniques

## 📌 Please ensure you complete the following before you start 

- an authenticated wechat used to simulate a web scan login
- successfully register with [OpenAI](https://openai.com/api/) and get `seeion` on the web [^1]

## 🐟 Use with docker 

**Verify the local environment**[^2]
```bash
docker version
docker compose version
```

**Create `docker-compose.yml` and `.env` file in the same directory**

- the contents of `docker-compose.yml` are copied directly from [docker-compose](https://github.com/UNICKCHENG/ChatGPT-For-Wechat/blob/main/docker-compose.yml)
- the contents of `.env` are copied from [.example.env](https://github.com/UNICKCHENG/ChatGPT-For-Wechat/blob/main/.example.env) ，and you need to modify `<your-seeion-token>`

**Starting services**
```bash
# > step 1 starting services
docker compose up -d

# > step 2 print logs to scan login，after successful ctrl+c exit
docker logs -f chatGPT

# if you don't want to use chatGPT
docker compose down
```

## 🚀 Local development

**Verify the local environment**
```bash
# node version >= 16
# npm version >= 7
node -v
npm -v
git -v
```

**Building and starting services**
```bash
# > step 1 download source code
git clone https://github.com/UNICKCHENG/ChatGPT-For-Wechat.git

# > step 2 configure the .env information
# !!! Please modify the contents of `.env`
cp .example.env .env

# > step 3 installing dependencies
npm install

# > step 4 starting services
npm run dev
```

## 🎉 Conversation screenshot

- [Example 1](./assets/3437A986-FB88-45DE-B881-C38CCC445BA1.jpeg)
- [Example 2](./assets/DDB677D9-DFE8-4843-980E-9304B64C29D5.jpeg)

## 👍 Find Other excellent projects (additions welcome)

- [transitive-bullshit/chatgpt-api](https://github.com/transitive-bullshit/chatgpt-api): unofficial ChatGPT API
- [fuergaosi233/wechat-chatgpt](https://github.com/fuergaosi233/wechat-chatgpt): support for email and password logins ChatGPT
- [sunshanpeng/wechaty-chatgpt](https://github.com/sunshanpeng/wechaty-chatgpt): a wechat bot demo connected to ChatGPT


[^1]: https://github.com/transitive-bullshit/chatgpt-api#session-tokens
[^2]: https://github.com/UNICKCHENG/Tools-Deployment