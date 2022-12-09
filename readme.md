# ChatGPT For Wechat

[ChatGPT-For-Wechat](https://github.com/UNICKCHENG/ChatGPT-For-Wechat) 是一个基于 [wechaty/wechaty](https://github.com/wechaty/wechaty) 的项目，目的是在微信中调用 [ChatGPT](https://openai.com/blog/chatgpt/) 等接口。没错，我并不打算这个项目只限于 ChatGPT  这一个接口，就像 OpenAI 并不只有 ChatGPT，而且有很多更好地项目已经实现了这个功能，甚至也集成到了 [微信对话开放平台](https://openai.weixin.qq.com/) 、小程序等。

## 感谢名单

- 感谢 [wechaty/wechaty](https://github.com/wechaty/wechaty) 提供的连接「微信」方案，以及 [web 协议支持](https://wechaty.js.org/2021/04/13/wechaty-uos-web/)
- 感谢 [OpenAI](https://openai.com/api/) 提供的 [OpenAI API](https://beta.openai.com/docs/api-reference/introduction) 和 [ChatGPT](https://openai.com/blog/chatgpt/)
- 感谢所有开源项目的思路和技术支持

## 📌**注意：要运行这个项目有两个必要条件**

- 一个已经认证的微信号，用于模拟 web 端扫码登录
- 成功注册 [OpenAI](https://openai.com/api/)，并在网页端获取 `seeion`

## docker 启动服务

**验证本地 docker 环境**[^1]
```bash
docker version
docker compose version
```

**在同一目录下新建 `docker-compose.yml` 和 `.env` 两文件**

- `docker-compose.yml` 内容直接复制 [docker-compose](https://github.com/UNICKCHENG/ChatGPT-For-Wechat/blob/main/docker-compose.yml)
- `.env`，修改 [.example.env](https://github.com/UNICKCHENG/ChatGPT-For-Wechat/blob/main/.example.env) 内的 `<your-seeion-token>`

**启动服务**
```bash
# > step 1 启动服务
docker compose up -d

# > step 2 打印日志用于扫码登陆，成功后 ctrl+c 退出查看实时日志即可
docker logs -f chatGPT

# 如果您不想使用了，可以使用这个命令来结束当前服务
docker compose down
```

## 本地构建

**验证本地环境**
```bash
# node version 不低于 16, npm version 不低于 7
node -v
npm -v
git -v
```

**构建和启动服务**
```bash
# > step 1 下载源码
git clone https://github.com/UNICKCHENG/ChatGPT-For-Wechat.git

# > step 2 配置 .env 信息，！！！请修改文件内的内容
cp .example.env .env

# > step 3 安装依赖
npm install

# > step 4 启动
npm run dev
```

**对话截图**
- [单聊截图](./assets/3437A986-FB88-45DE-B881-C38CCC445BA1.jpeg)
- [群聊截图](./assets/DDB677D9-DFE8-4843-980E-9304B64C29D5.jpeg)

## 其他优秀项目（欢迎补充）

- [transitive-bullshit/chatgpt-api](https://github.com/transitive-bullshit/chatgpt-api) 非官方的 [ChatGPT](https://openai.com/blog/chatgpt/) API
- [fuergaosi233/wechat-chatgpt](https://github.com/fuergaosi233/wechat-chatgpt) 支持邮箱和密码登录 ChatGPT
- [sunshanpeng/wechaty-chatgpt](https://github.com/sunshanpeng/wechaty-chatgpt) 一个连接 ChatGPT 的 wechat 机器人 demo


[^1]: https://github.com/UNICKCHENG/Tools-Deployment