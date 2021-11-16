# pull official base image
FROM bitnami/node:14-debian-10

# set working directory
WORKDIR /app

# add app
COPY . .
ENV NODE_ENV=production

# install app dependencies
RUN yarn install --silent
RUN yarn run build

# start
CMD ["yarn", "run",  "start"]
