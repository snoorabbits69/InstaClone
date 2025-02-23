# Use a smaller Node.js image for production
FROM node:18-slim

# Set the working directory
WORKDIR /app

# Copy package files first to leverage Docker cache for dependencies
COPY package*.json ./

# Install production dependencies only
RUN npm install --omit=dev

# Copy only necessary files
COPY . .

# Ensure correct file permissions
RUN chmod -R 755 /app

# Expose the port
EXPOSE 3000

# Command to run the app
CMD ["node", "server.js"]
