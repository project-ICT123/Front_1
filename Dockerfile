# Use an official Node.js runtime as a parent image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Set npm config timeout to avoid socket timeout errors
ENV NPM_CONFIG_TIMEOUT=60000

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Clear npm cache and install dependencies
RUN npm cache clean --force && npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the React application
RUN npm run build

# Install a simple HTTP server to serve the static files
RUN npm install -g serve

# Set the command to run the HTTP server on port 3300
CMD ["serve", "-s", "build", "-l", "3300"]

# Expose port 3300 to the outside world
EXPOSE 3300 