#!/bin/bash

# E2E Test Cleanup Script
# Usage: ./cleanup.sh [--deep]

set -e

COMPOSE_FILE="docker-compose.e2e.yml"
DEEP_CLEAN=false

# Parse arguments
if [ "$1" = "--deep" ] || [ "$1" = "-d" ]; then
    DEEP_CLEAN=true
fi

echo "=========================================="
echo "E2E Test Cleanup Script"
echo "=========================================="
echo ""

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Error: Docker is not running"
    echo "Please start Docker and try again"
    exit 1
fi

echo "Stopping E2E containers..."
docker-compose -f "$COMPOSE_FILE" down -v 2>/dev/null || true
echo "✓ Containers stopped"

if [ "$DEEP_CLEAN" = true ]; then
    echo ""
    echo "Performing deep clean..."

    # Remove E2E containers
    echo "Removing E2E containers..."
    CONTAINERS=$(docker ps -a --filter "name=e2e-" --format "{{.ID}}" 2>/dev/null || true)
    if [ -n "$CONTAINERS" ]; then
        echo "$CONTAINERS" | xargs docker rm -f 2>/dev/null || true
        echo "✓ E2E containers removed"
    else
        echo "✓ No E2E containers found"
    fi

    # Remove E2E volumes
    echo "Removing E2E volumes..."
    VOLUMES=$(docker volume ls --filter "name=e2e" --format "{{.Name}}" 2>/dev/null || true)
    if [ -n "$VOLUMES" ]; then
        echo "$VOLUMES" | xargs docker volume rm 2>/dev/null || true
        echo "✓ E2E volumes removed"
    else
        echo "✓ No E2E volumes found"
    fi

    # Remove E2E networks
    echo "Removing E2E networks..."
    NETWORKS=$(docker network ls --filter "name=e2e" --format "{{.ID}}" 2>/dev/null || true)
    if [ -n "$NETWORKS" ]; then
        echo "$NETWORKS" | xargs docker network rm 2>/dev/null || true
        echo "✓ E2E networks removed"
    else
        echo "✓ No E2E networks found"
    fi

    # Remove dangling images
    echo "Removing dangling images..."
    DANGLING=$(docker images -f "dangling=true" -q 2>/dev/null || true)
    if [ -n "$DANGLING" ]; then
        echo "$DANGLING" | xargs docker rmi 2>/dev/null || true
        echo "✓ Dangling images removed"
    else
        echo "✓ No dangling images found"
    fi

    echo ""
    echo "=========================================="
    echo "Deep clean complete!"
    echo "=========================================="
else
    echo ""
    echo "=========================================="
    echo "Cleanup complete!"
    echo "=========================================="
    echo ""
    echo "Use './cleanup.sh --deep' for deep clean"
    echo "(removes all E2E containers, volumes, networks, and dangling images)"
fi

echo ""
echo "Disk space freed:"
docker system df

exit 0
