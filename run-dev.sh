./stop-containers.sh
docker build -f ./docker/dev/Dockerfile -t jr-site-users-service-dev .
docker run --env JR_SITE_DEV_DB_CONNECTION_URI=${JR_SITE_DEV_DB_CONNECTION_URI} --env JR_SITE_DEV_DB_CONNECTION_USERNAME=${JR_SITE_DEV_DB_CONNECTION_USERNAME} --env JR_SITE_DEV_DB_CONNECTION_PASSWORD=${JR_SITE_DEV_DB_CONNECTION_PASSWORD} -p 3005:3005 -d --name jr-site-users-service-dev-container jr-site-users-service-dev
docker logs -f jr-site-users-service-dev-container
