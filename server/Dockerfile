FROM node:20-alpine AS base
RUN apk add --no-cache openssl
WORKDIR /usr/src/app
COPY package.json pnpm-lock.yaml ./
RUN npm i -g pnpm
RUN pnpm install
COPY . .
RUN pnpm prisma generate

FROM base AS dev
CMD [ "pnpm", "dev" ]

FROM base AS prod
RUN pnpm build
CMD [ "node", "dist/bin.js" ]
