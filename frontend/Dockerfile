FROM node:18

WORKDIR /app

# Copy package.json and yarn.lock (if available)
COPY package.json yarn.lock* ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy the rest of the application code
COPY . .

# Build the Next.js app
RUN yarn build

EXPOSE 3000

# Start the application in development mode
CMD ["yarn", "dev"]