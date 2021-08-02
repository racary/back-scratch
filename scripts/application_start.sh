sudo chmod -R 777 /home/ec2-user/back-scratch
cd /home/ec2-user/express-app

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh"] && \. "$NVM_DIR/nvm.sh"
[ -s "$NVM_DIR/bash_comletion" ] && \. "$NVM_DIR/bash_completion"

npm install

npm run start