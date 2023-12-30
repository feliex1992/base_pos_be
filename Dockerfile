# Base image
FROM node:16.14.2

# Create app directory
WORKDIR /usr/src/app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# Install app dependencies
RUN npm ci

# Bundle app source
COPY . .

# Creates a "dist" folder with the production build
RUN npm run build

# Start the server using the production build
# CMD [ "node", "dist/src/main.js" ]
CMD ["/bin/bash", "-c", "npm run retail:migrate; node dist/src/main"]
