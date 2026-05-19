FROM node:22-alpine

WORKDIR /app

# 1. Copy the shared package FIRST (both its package.json and source code)
# npm needs to see the shared package fully to link it properly
COPY shared/ ./shared/

# 2. Copy the notification-service package files
COPY posts-service/package*.json ./notification-service/

# 3. Change directory to notification-service to run the install
WORKDIR /app/notification-service
RUN npm ci --omit=dev

# 4. Copy the rest of your notification-service source code
COPY notification-service/src/ ./src/
COPY notification-service/app.js ./app.js
COPY notification-service/server.js ./server.js

# 5. Run from the notification-service directory
CMD ["node", "server.js"]