./stop-containers.sh
docker build -f ./docker/prod/Dockerfile -t jr-site-users-service-prod .
docker run --env JR_SITE_PROD_DB_CONNECTION_URI=${JR_SITE_PROD_DB_CONNECTION_URI} --env JR_SITE_PROD_DB_CONNECTION_USERNAME=${JR_SITE_PROD_DB_CONNECTION_USERNAME} --env JR_SITE_PROD_DB_CONNECTION_PASSWORD=${JR_SITE_PROD_DB_CONNECTION_PASSWORD} -p 3005:3005 -d --name jr-site-users-service-prod-container jr-site-users-service-prod
docker logs -f jr-site-users-service-prod-container
