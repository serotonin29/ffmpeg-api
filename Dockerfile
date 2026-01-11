FROM node:20-bookworm-slim

RUN apt-get update \
 && apt-get install -y ffmpeg \
 && rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY server.js .
RUN npm install express multer

EXPOSE 3000
CMD ["node", "server.js"]
