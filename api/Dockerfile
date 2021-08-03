FROM node

WORKDIR /usr/api
COPY package.json .
COPY package-lock.json .
RUN npm install --quiet
COPY . .