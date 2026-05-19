FROM node:22-alpine

WORKDIR /app

# 1. Copy the shared package FIRST (both its package.json and source code)
# npm needs to see the shared package fully to link it properly
COPY shared/ ./shared/

# 2. Copy the posts-service package files
COPY posts-service/package*.json ./posts-service/

# 3. Change directory to posts-service to run the install
WORKDIR /app/posts-service
RUN npm ci --omit=dev

# 4. Copy the rest of your posts-service source code
COPY posts-service/src/ ./src/
COPY posts-service/app.js ./app.js
COPY posts-service/server.js ./server.js

# 5. Run from the posts-service directory
CMD ["node", "server.js"]