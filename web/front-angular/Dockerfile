FROM node:16-bullseye-slim


WORKDIR /app

# https://github.com/webpack/webpack/issues/14532#issuecomment-947012063
#ENV NODE_OPTIONS=--openssl-legacy-provider

COPY package.json .

RUN npm install -g --silent @angular/cli@12.2.12
RUN npm install -g npm@8.1.0
RUN npm install
#RUN ng update @angular/core @angular/cli
CMD ["npm", "start"]
