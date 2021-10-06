FROM node

WORKDIR /usr/api
COPY package.json ./
COPY package-lock.json ./
COPY ./src/db/ ./src/db/
COPY . .
RUN npm install --quiet