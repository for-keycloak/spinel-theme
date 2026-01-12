FROM node:24-alpine

WORKDIR /app

# Install Java for Keycloakify JAR building
RUN apk add --no-cache openjdk17-jre maven

# Default command
CMD ["sh"]
