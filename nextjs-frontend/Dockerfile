# pull official base image
FROM bitnami/node:14-debian-10

# set working directory
WORKDIR /app

# add app
COPY . .

# install app dependencies
RUN yarn install
RUN yarn run build

# start
CMD ["yarn", "run",  "start"]
