FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY server.js ./
COPY config ./config
COPY controllers ./controllers
COPY file ./file
COPY middleware ./middleware
COPY models ./models
COPY routes ./routes
COPY socket ./socket
COPY Serviceaccount.json ./
COPY .env ./

EXPOSE 3000

CMD ["node", "server.js"]
