#!/bin/bash

# Install MongoDB

# Import the public key used by the package management system
wget -qO - https://www.mongodb.org/static/pgp/server-4.2.asc | sudo apt-key add -
# Add Sources
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu bionic/mongodb-org/4.2 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.2.list
# Reload the local package database
sudo apt update
# Install the MongoDB packages
sudo apt install -y mongodb-org
# Start and verify the service
sudo systemctl start mongod &
sudo systemctl status mongod &

# Enable the service start on every reboot
sudo systemctl enable mongod


# Install NodeJS and NPM using nvm
# curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash
# . ~/.nvm/nvm.sh
# nvm install node

sudo apt update

cd ~
curl -sL https://deb.nodesource.com/setup_12.19.0 -o nodesource_setup.sh
sudo bash nodesource_setup.sh
sudo apt-get install nodejs -y
sudo apt install build-essential -y

# node -v
# npm -v

sudo apt-get update -y
sudo apt-get install git -y
