# jr-site-users-service

Node.js microservice to manage users for [`jr-site-ui`](https://github.com/joshm101/jr-site-ui)

## Prerequisites
- ### Node.js
- ### Environment variables
  - Development environment:
    - `JR_SITE_DEV_DB_CONNECTION_URI`
    - `JR_SITE_DEV_DB_CONNECTION_USERNAME`
    - `JR_SITE_DEV_DB_CONNECTION_PASSWORD`
  - Production environment:
    - `JR_SITE_PROD_DB_CONNECTION_URI`
    - `JR_SITE_PROD_DB_CONNECTION_USERNAME`
    - `JR_SITE_PROD_DB_CONNECTION_PASSWORD`

## To run
- Clone this repository.
- Run `npm install` to install dependencies listed in `package.json`.
- Development environment:
  - Once the necessary environment variables have been set, run the following `package.json` script: `npm run start-dev`. This will run the microservice locally on port 3005 (default).

## Notes
This project uses [`bcrypt`](https://www.npmjs.com/package/bcrypt) to handle user password hashing. Depending on your environment, there may be additional prerequisites to use `bcrypt`. View the [`bcrypt` installation instructions](https://github.com/kelektiv/node.bcrypt.js/wiki/Installation-Instructions) for more information.