FROM node

# Install dependencies and copy source files
WORKDIR /usr/app
COPY package.json ./
COPY package-lock.json ./
RUN npm install --quiet
COPY . .