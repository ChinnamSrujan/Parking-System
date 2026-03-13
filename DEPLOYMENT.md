# Deployment Guide

## Prerequisites

- Java 17 JDK
- Node.js 18+
- MongoDB Atlas account
- Maven
- Git

## Environment Variables

### Backend
Create a `.env` file or set environment variables:

```bash
DB_PASSWORD=your_mongodb_password
JWT_SECRET=your_jwt_secret_key_for_production
SPRING_PROFILES_ACTIVE=prod
```

### Frontend
Create `.env` file in frontend directory:

```bash
VITE_API_URL=https://your-backend-url.com/api
```

## Local Development

### Backend
```bash
cd smart-parking-backend
export DB_PASSWORD=your_password
mvn spring-boot:run
```

### Frontend
```bash
cd smart-parking-frontend
npm install
npm run dev
```

## Production Build

### Backend
```bash
cd smart-parking-backend
mvn clean package -DskipTests
java -jar target/smart-parking-backend-1.0.0.jar
```

### Frontend
```bash
cd smart-parking-frontend
npm run build
# Serve the dist folder using nginx or any static server
```

## Docker Deployment

### Backend Dockerfile
```dockerfile
FROM openjdk:17-jdk-slim
WORKDIR /app
COPY target/smart-parking-backend-1.0.0.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
```

### Frontend Dockerfile
```dockerfile
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### Docker Compose
```yaml
version: '3.8'
services:
  backend:
    build: ./smart-parking-backend
    ports:
      - "8080:8080"
    environment:
      - DB_PASSWORD=${DB_PASSWORD}
      - JWT_SECRET=${JWT_SECRET}
      - SPRING_PROFILES_ACTIVE=prod
  
  frontend:
    build: ./smart-parking-frontend
    ports:
      - "80:80"
    depends_on:
      - backend
```

## Cloud Deployment Options

### AWS
- Backend: Elastic Beanstalk or ECS
- Frontend: S3 + CloudFront
- Database: MongoDB Atlas

### Heroku
```bash
# Backend
heroku create smart-parking-backend
heroku config:set DB_PASSWORD=your_password
git push heroku main

# Frontend
heroku create smart-parking-frontend
heroku buildpacks:set heroku/nodejs
git push heroku main
```

### Vercel (Frontend)
```bash
cd smart-parking-frontend
vercel --prod
```

### Railway (Backend)
- Connect GitHub repository
- Set environment variables
- Deploy automatically

## Nginx Configuration

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        root /usr/share/nginx/html;
        try_files $uri $uri/ /index.html;
    }

    location /api {
        proxy_pass http://backend:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

## MongoDB Atlas Setup

1. Create cluster at mongodb.com
2. Create database user
3. Whitelist IP addresses (0.0.0.0/0 for development)
4. Get connection string
5. Update application.properties

## Security Checklist

- [ ] Change JWT secret in production
- [ ] Use HTTPS
- [ ] Enable CORS only for trusted domains
- [ ] Set strong MongoDB password
- [ ] Enable MongoDB IP whitelist
- [ ] Use environment variables for secrets
- [ ] Enable rate limiting
- [ ] Add input validation
- [ ] Implement logging and monitoring

## Monitoring

Consider adding:
- Application Performance Monitoring (APM)
- Error tracking (Sentry)
- Log aggregation (ELK Stack)
- Uptime monitoring

## Backup Strategy

- MongoDB Atlas automatic backups
- Regular database exports
- Version control for code
- Document recovery procedures
