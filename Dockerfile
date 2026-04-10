FROM node:20-slim

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
ENV NEXT_TURBOPACK=0
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]