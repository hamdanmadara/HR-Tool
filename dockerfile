FROM node:22.11.0-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./
# Install dependencies with verbose output
RUN npm install
# Copy entire project
COPY . .

EXPOSE 4200

CMD ["npx", "ng", "serve", "--host", "0.0.0.0", "--poll", "500", "--disable-host-check"]