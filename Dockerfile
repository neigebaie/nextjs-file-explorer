# Use the official Node.js LTS-slim image for a smaller footprint.
FROM node:lts-slim

# Set the working directory inside the container.
WORKDIR /app

# Copy the package.json and pnpm-lock.yaml files.
COPY package.json pnpm-lock.yaml ./

# Install pnpm globally.
RUN npm install -g pnpm

# Install project dependencies using pnpm.
RUN pnpm install

# Copy the rest of the application code.
COPY . .

# Build the Next.js app.
RUN pnpm run build

# Set environment variable to production.
ENV NODE_ENV=production

# Expose the port on which your app runs.
EXPOSE 3010

# Start the Next.js app.
CMD ["pnpm", "start", "--", "-p", "3010"]
