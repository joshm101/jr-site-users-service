# jr-site-users-service

Node.js microservice to manage users for [`jr-site-ui`](https://github.com/joshm101/jr-site-ui)

## Prerequisites
- ### Node.js
- ### Environment variables
  - Development environment:
    - `JR_SITE_DEV_DB_CONNECTION_URI`
    - `JR_SITE_DEV_DB_CONNECTION_USERNAME`
    - `JR_SITE_DEV_DB_CONNECTION_PASSWORD`
  - Test environment:
    - `JR_SITE_TEST_DB_CONNECTION_URI`
    - `JR_SITE_TEST_DB_CONNECTION_USERNAME`
    - `JR_SITE_TEST_DB_CONNECTION_PASSWORD`
  - Production environment:
    - `JR_SITE_PROD_DB_CONNECTION_URI`
    - `JR_SITE_PROD_DB_CONNECTION_USERNAME`
    - `JR_SITE_PROD_DB_CONNECTION_PASSWORD`
  - `JR_SITE_SECRET` - Secret used for signing JWTs (default value: `CHANGE_ME`)

## To run
- Clone this repository.
- Run `npm install` to install dependencies listed in `package.json`.
- Development environment:
  - Once the necessary environment variables have been set, run the following `package.json` script: `npm run start-dev`. This will run the microservice locally on port 3005 (default).
  - Once the necessary environment variables have been set, run the following `package.json` script: `npm test`. This will execute the microservice's tests.
## To run (Docker)
- The only prerequisites for running this microservice in a container environment are the environment variables listed above and Docker itself installed on the host machine.
- Once Docker is installed and the necessary environment variables have been set, run one of the shell scripts located at the root of this repository (depending on what envrionment you would like to run), e.g.: `./run-dev.sh`. This will:
  - Stop and remove an already built/running container for this repository (if it exists).
  - Build and run this repository in a Docker container (exposed on port specified in `Dockerfile`).
  - At this point, the microservice will be up and running and ready to take requests.

## To create a user
User creation is not a valid/regular use-case for this microservice, however, this microservice does have a manual user creation script available to create a user on-demand. Once you have cloned this repository, installed its dependencies, and set the necessary environment variables, run the following to create a user:
- `npm run start-dev --create-user --username <some_username> --password <some_password> --admin`
    - `--create-user`: explicit specification to run user creation script
    - `--username <some_username>`: Specify the username for the user you are creating.
    - `--password <some_password>`: Specify the password for the user you are creating.
    - `--admin` (optional): If this flag is provided, the created user will have write privileges. If this flag is not provided, the created user will have read-only privileges.
  - Examples:
    - admin: `npm run start-dev --create-user --username admin --password secret_password --admin`
    - read-only: `npm run start-dev --create-user --username readonly --password secret_password`
    - The above examples will create users on the development database (`start-dev`). Use `npm run start-prod [rest-of-command]` to create a user on the production database.

## Notes
This project uses [`bcrypt`](https://www.npmjs.com/package/bcrypt) to handle user password hashing. Depending on your environment, there may be additional prerequisites to use `bcrypt`. View the [`bcrypt` installation instructions](https://github.com/kelektiv/node.bcrypt.js/wiki/Installation-Instructions) for more information.