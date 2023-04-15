FROM node:18-alpine AS base

# Install pnpm
RUN npm install -g pnpm

WORKDIR /app

COPY package*.json pnpm-lock.yaml ./

RUN pnpm install

COPY . .

EXPOSE 3001

CMD [ "pnpm", "start" ]
