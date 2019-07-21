#!bin/bash

ng build --configuration=development
echo $?
if [ "$?" = 0 ]; then
  cp ./src/assets/htaccess ../BackEnd/public/web/.htaccess
fi
