FROM node:16.13

# Create app directory
RUN mkdir -p /app
WORKDIR /app

COPY ./package*.json /app/
RUN npm install

# Copying source files
COPY . /app

CMD "npm" "run" "start:dev"