#!/bin/bash
sudo apt update
sudo apt install -y curl git nodejs npm mysql-client
git clone https://github.com/<your-username>/task-manager-app.git
cd task-manager-app
npm install
node app.js &
