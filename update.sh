#!/bin/bash

# Define color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
NC='\033[0m' # No Color

# Define docker variables
CONTAINER_NAME="nextjs-file-explorer"
PORT=3010

# Start logging
exec > >(tee -a update.log) 2>&1

echo -e "${YELLOW}Update process started at: $(date +"%Y-%m-%d %T")${NC}"

echo -e "${GREEN}Pulling latest changes from GitHub...${NC}"
git pull

if [ $? -eq 0 ]; then
    echo -e "${GREEN}Successfully pulled from GitHub.${NC}"
else
    echo -e "${RED}Failed to pull from GitHub. Check the log above for errors.${NC}"
    exit 1
fi


echo -e "${GREEN}Stopping and removing the existing Docker container...${NC}"
sudo docker stop $CONTAINER_NAME
sudo docker rm $CONTAINER_NAME

if [ $? -eq 0 ]; then
    echo -e "${GREEN}Successfully stopped and removed the Docker container.${NC}"
else
    echo -e "${RED}Failed to stop or remove the Docker container. Check the log above for errors.${NC}"
    exit 1
fi

echo -e "${GREEN}Building and starting the Docker container...${NC}"
sudo docker build -t $CONTAINER_NAME .
sudo docker run -d -p $PORT:$PORT --name $CONTAINER_NAME $CONTAINER_NAME

if [ $? -eq 0 ]; then
    echo -e "${GREEN}Docker container is up and running.${NC}"
else
    echo -e "${RED}Failed to build or start the Docker container. Check the log above for errors.${NC}"
    exit 1
fi

echo -e "${GREEN}Update process completed successfully!${NC}"
