# Base Node
FROM node:20.12.1-slim AS base
LABEL author="Dmitry Neverovski <dmitryneverovski@gmail.com>"

ARG NODE_ENV
ENV NODE_ENV=${NODE_ENV:-development}

WORKDIR /app

COPY --chown=node:node package*.json ./


# Install dependencies
FROM base AS deps

RUN npm ci

USER node


# Build the source code
FROM base AS build

COPY --chown=node:node --from=deps /app/node_modules ./node_modules
COPY --chown=node:node . .

RUN NODE_ENV=${NODE_ENV} npm run build

USER node


# Install dependencies without devDependencies
FROM base AS modules

RUN npm ci --omit=dev --ignore-scripts


# Production image, copy all the files and run next
FROM modules AS runner

ARG APP_PORT
ENV APP_PORT=${APP_PORT:-5656}

COPY --chown=node:node --from=build /app/dist ./dist

EXPOSE ${APP_PORT}

CMD ["sh", "-c", "node dist/main.js"]


