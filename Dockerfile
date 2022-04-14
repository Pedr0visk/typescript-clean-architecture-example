########
# BASE #
########
FROM node:16.14.0-alpine as base
LABEL maintainer="Pedro Santos <ext.pedro.santos@navegg.com>"

###########
# BUILDER #
###########
FROM base as builder
WORKDIR /app
COPY package.json .
COPY . .
RUN chmod +x ./scripts/*
RUN npm run build

#########
# FINAL #
#########
FROM base
# ENV NODE_ENV=production
WORKDIR /app

COPY --from=builder /app/dist .
CMD ["npm", "start"]