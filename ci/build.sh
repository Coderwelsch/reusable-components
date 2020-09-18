#!/bin/sh

# install dependencies
yarn install;

# load env files
ENV_FILE="../.env.development"
if [ -f "$ENV_FILE" ]; then
    export $(egrep -v '^#' .env.development | xargs)
fi

# build static site
echo "Build Storybook";
yarn build-storybook;