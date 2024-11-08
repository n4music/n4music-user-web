# Base Image
FROM node:20-alpine AS base
LABEL author="nguyenybin2015@gmail.com"

WORKDIR /app
COPY package.json package-lock.json ./

# Install dependencies
RUN apk add --no-cache git python3 make g++ \
    && npm i --legacy-peer-deps \
    && npm cache clean --force

# Build Image
FROM node:20-alpine AS build
LABEL author="nguyenybin2015@gmail.com"

WORKDIR /app
COPY --from=base /app/node_modules ./node_modules
COPY . .

RUN apk add --no-cache git curl \
    && npm run build \
    && rm -rf node_modules \
    && npm install --production --frozen-lockfile --ignore-scripts --prefer-offline

# Production Image
FROM node:20-alpine AS production
LABEL author="nguyenybin2015@gmail.com"

WORKDIR /app

COPY --from=build /app/package.json /app/package-lock.json ./
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public

EXPOSE 3000
CMD ["npm", "start"]