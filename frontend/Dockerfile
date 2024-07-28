FROM node:18
WORKDIR /front
RUN npm install
COPY public ./public
COPY src ./src
COPY package.json ./package.json
COPY package-lock.json ./package-lock.json 
COPY tailwind.config.js ./tailwind.config.json
COPY tailwind.config.js tailwind.config.js
COPY index.html ./index.html
EXPOSE 5173
CMD [ "npm","run","dev" ];
