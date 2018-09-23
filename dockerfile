
# ============================================
# ===== BUILD STAGE ==========================
# ============================================

FROM alpine:3.7
RUN mkdir -p /srv/workspace/
WORKDIR /srv/workspace

RUN apk add --update nodejs nodejs-npm
RUN apk add mongodb

EXPOSE 3000 27017
VOLUME /data/db


COPY package.json ./

RUN npm install --no-package-lock

COPY src/ ./src
COPY schema/ ./schema
COPY \
  index.js \
  README.md \
  .gitignore \
  LICENSE     \
  ./

RUN mongod --fork --syslog --dbpath /data/db
CMD ["node", "index.js"]
