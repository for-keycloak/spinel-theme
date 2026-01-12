# Keycloak Theme Development with Keycloakify

# Default recipe
default:
    @just --list

# Install dependencies
install:
    docker compose run --rm node yarn install

# Add a package
add *PACKAGES:
    docker compose run --rm node yarn add {{PACKAGES}}

# Start Storybook for development
up:
    docker compose up -d storybook

# Stop all services
down:
    docker compose down

# View Storybook logs
logs:
    docker compose logs -f storybook

# Open shell in Node container
shell:
    docker compose run --rm node sh

# Clean up everything
clean:
    docker compose down -v
    rm -rf node_modules dist dist_keycloak .cache

# Build the Keycloak theme JAR
build:
    docker compose run --rm node yarn build-keycloak-theme

# Type check
typecheck:
    docker compose run --rm node yarn build --mode development

# Run Playwright tests (starts storybook automatically)
test:
    docker compose up -d storybook
    @echo "Waiting for Storybook to be ready..."
    @sleep 5
    docker compose run --rm playwright yarn test
    docker compose stop storybook

# Generate screenshots from Storybook
screenshots:
    docker compose up -d storybook
    @echo "Waiting for Storybook to be ready..."
    @sleep 5
    docker compose run --rm playwright yarn test:screenshots
    docker compose stop storybook
