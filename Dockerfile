# https://github.com/wechaty/wechaty/blob/main/Dockerfile.alpine

FROM node:slim
LABEL maintainer="unickcheng <hi@unickcheng.cc>"

ENV OPENAI_ORGANIZATION ${OPENAI_ORGANIZATION:-""}
ENV OPENAI_API_KEY ${OPENAI_API_KEY:-""}
ENV OPENAI_MODEL ${OPENAI_MODEL:-""}
ENV SESSION_TOKEN ${SESSION_TOKEN:-""}

WORKDIR /chatgpt
COPY . ./

# RUN sed -i 's/deb.debian.org/mirrors.ustc.edu.cn/g' /etc/apt/sources.list &&\
#     sed -i 's|security.debian.org/debian-security|mirrors.ustc.edu.cn/debian-security|g' /etc/apt/sources.list

RUN set -x; npm install &&\
    cd ./node_modules/puppeteer && npm run install &&\
    apt-get update && apt install -y libnss3-dev libgdk-pixbuf2.0-dev libgtk-3-dev libxss-dev libasound2 &&\
    npm cache clean --force && apt-get clean && rm -rf /var/lib/apt/lists/*

ENTRYPOINT [ "npm", "run", "docker" ]