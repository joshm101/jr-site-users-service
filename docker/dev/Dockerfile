FROM node:8.15

# Create app diretory
WORKDIR ./app

# Install dependencies
# A wildcard is used to ensure both package.json and package-lock.json
# are copied where available (npm@5+)
COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

CMD ["npm", "run", "start-dev"]
