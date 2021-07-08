# base image
FROM node:current-alpine

WORKDIR /app

# copy over package files and install
COPY package*.json ./
RUN npm install

# copy the rest of the files
COPY . ./

# expose the port and start server
EXPOSE 3001
CMD ["npm", "start"]
