#!bin/bash

ng build --configuration=development
echo $?
if [ "$?" = 0 ]; then
  cp ./extras/htaccess ../BackEnd/public/web/.htaccess
fi
