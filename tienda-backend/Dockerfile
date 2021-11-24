# pull official base image
FROM bitnami/node:14-debian-10

# set working directory
WORKDIR /app

# add app
COPY . .

# install app dependencies
RUN yarn install --silent
RUN NODE_ENV=production yarn run build

# start
CMD ["NODE_ENV=production", "yarn", "run",  "start"]
