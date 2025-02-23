# Use Node.js image
FROM node:18

# Set the working directory
WORKDIR /front

# Copy package files first to cache dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app's source code
COPY . .

# Expose the Vite dev server's default port
EXPOSE 5173

# Start the dev server
CMD ["npm", "run", "dev"]
