FROM node:18
COPY public public
COPY src src
COPY package.json package.json
COPY package-lock.json package-lock.json 
COPY tailwind.config.js tailwind.config.json
RUN npm install
EXPOSE 5173
CMD [ "npm","run","dev" ];
