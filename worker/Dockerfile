# Reference
# https://cloud.google.com/appengine/docs/managed-vms/custom-runtimes
# http://ifelse.io/2015/08/17/dockerizing-a-nodejs-app/

# The image is based on the Debian Wheezy distribution.
FROM gcr.io/google_appengine/debian

## BEGIN config

ENV NODE_VERSION 4.2.1
ENV APP_DIR /app
ENV NODE_ENV production

## END config

# Fetch and install Node.js
RUN apt-get update -y && apt-get install --no-install-recommends -y -q curl python build-essential git ca-certificates \
	&& apt-get -y autoclean \
	&& mkdir /nodejs && curl https://nodejs.org/dist/v${NODE_VERSION}/node-v${NODE_VERSION}-linux-x64.tar.gz | tar xvzf - -C /nodejs --strip-components=1

# Add Node.js installation to PATH, and set
# the current working directory to ${APP_DIR}
# so future commands in this Dockerfile are easier to write
ENV PATH $PATH:/nodejs/bin

WORKDIR ${APP_DIR}

# Copy the file package.json from your app's directory to the Docker
# image. (See note below regarding image caching and dependencies.)
ADD package.json ${APP_DIR}/

# Use private npm
# ADD .npmrc /root/.npmrc

RUN npm install --production

# Adds the rest of the application source. Since this is a node.js app
ADD . ${APP_DIR}

# Specify that npm start is the process that will run in the Docker container. The app should listen on port 8080.
ENTRYPOINT ["/nodejs/bin/npm", "start"]

