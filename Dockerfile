FROM linuxserver/ffmpeg:latest

RUN apk add --no-cache nodejs npm
WORKDIR /app

COPY server.js .
RUN npm install express multer

EXPOSE 3000
CMD ["node", "server.js"]
