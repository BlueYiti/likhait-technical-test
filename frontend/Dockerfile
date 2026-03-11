FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy dependency files first (better Docker caching)
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the app
COPY . .

# Expose Vite port
EXPOSE 5173

# Start dev server
CMD ["npm", "run", "dev", "--", "--host"]