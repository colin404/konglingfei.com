pnpm docs:build

if [[ $?  -eq 0 ]];then
  sudo rm -rf /var/www/dist
  sudo cp -a dist /var/www/dist
fi
