#!/bin/bash

# Define variables
DEPLOY_PATH="/home/zerocom/new.zero-31.com" # Adjust this if your website is in another folder
LOG_FILE="/home/zerocom/new.zero-31.com/deploy.log"
REPO_PATH="/home/zerocom/repositories/zero-31"

# Start log
echo "Starting deployment at $(date)" >> $LOG_FILE

# Navigate to repo
cd $REPO_PATH || { echo "Repo path not found!" >> $LOG_FILE; exit 1; }

# Pull latest changes
git pull origin main >> $LOG_FILE 2>&1

# Copy only changed files while excluding certain files
rsync -av --delete --update --exclude='.git' --exclude='deploy.sh' "$REPO_PATH/" "$DEPLOY_PATH/" >> $LOG_FILE 2>&1

# Ensure correct permissions
chown -R zerocom:zerocom $DEPLOY_PATH
find $DEPLOY_PATH -type d -exec chmod 755 {} \;
find $DEPLOY_PATH -type f -exec chmod 644 {} \;

npm install --prefix $DEPLOY_PATH >> $LOG_FILE 2>&1
npm run build --prefix $DEPLOY_PATH >> $LOG_FILE 2>&1

# Restart the node server on cpanel
pkill -f node
nohup node $DEPLOY_PATH/server.js &
echo "Node server restarted" >> $LOG_FILE




# Log completion
echo "Deployment completed at $(date)" >> $LOG_FILE
