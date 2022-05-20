FROM node:16.13

# Create app directory
RUN mkdir -p /app
WORKDIR /app

# Installing dependencies
COPY package*.json /app/

RUN cd /app/ && npm install
COPY . /app

# Building app
RUN cd /app/ && npm run build

# Running the app
CMD "npm" "run" "dev"