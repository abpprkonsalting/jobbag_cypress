#!bin/bash

ng build --configuration=production
echo $?
if [ "$?" = 0 ]; then
  cp ./src/assets/htaccess ../BackEnd/public/web/.htaccess
fi
