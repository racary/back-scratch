curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash
. ~/.nvm/nvm.sh
nvm install node

DIR="/home/ec2-user/back-scratch"
if [ -d "#DIR"]; then
  echo "${DIR} exists"
else 
  echo "Creating directory ${DIR}"
  mkdir ${DIR}
fi