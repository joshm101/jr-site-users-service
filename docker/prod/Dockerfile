FROM node:10.16

# Create app diretory
WORKDIR ./app

# Install dependencies
# A wildcard is used to ensure both package.json and package-lock.json
# are copied where available (npm@5+)
COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

ARG JR_SITE_PROD_DB_CONNECTION_URI
ARG JR_SITE_PROD_DB_CONNECTION_USERNAME
ARG JR_SITE_PROD_DB_CONNECTION_PASSWORD

ENV JR_SITE_PROD_DB_CONNECTION_URI=$JR_SITE_PROD_DB_CONNECTION_URI
ENV JR_SITE_PROD_DB_CONNECTION_USERNAME=$JR_SITE_PROD_DB_CONNECTION_USERNAME
ENV JR_SITE_PROD_DB_CONNECTION_PASSWORD=$JR_SITE_PROD_DB_CONNECTION_PASSWORD

CMD ["npm", "run", "start-prod"]
