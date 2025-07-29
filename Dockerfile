# Use Node.js LTS-based image
FROM node:20-alpine

# Create and move to working directory
WORKDIR /app

# Copy all source code from host
COPY . .

# Install dependencies
RUN npm install @vitejs/plugin-react --save-dev && npm install

# Expose port
EXPOSE 5173

# Run development server
CMD ["npm", "run", "dev", "--", "--port", "5173"]