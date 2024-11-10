# Builder stage
FROM node:18-alpine AS builder

WORKDIR /app

# Install dependencies first with legacy peer deps
COPY package*.json ./
RUN npm ci --legacy-peer-deps

# Copy necessary files
COPY next.config.js ./
COPY tsconfig.json ./
COPY public ./public
COPY src ./src

# Set environment variables
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

# Build with verbose logging
RUN npm run build || (cat .next/build-error.log && exit 1)

# Production stage
FROM node:18-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Copy necessary files from builder
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000

CMD ["node", "server.js"]