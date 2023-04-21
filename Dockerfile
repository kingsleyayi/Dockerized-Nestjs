# Use a Node.js base image
FROM node:19

# Set the working directory
WORKDIR /app

# Copy package.json and yarn.lock
COPY package.json yarn.lock ./

# Install dependencies using Yarn
RUN yarn install

# Copy the rest of the application code
COPY . .

# Expose a port for the application to run on
EXPOSE 3000

# Start the application
CMD ["yarn", "run", "start:dev"]
