#!bin/bash

ng build --configuration=production
echo $?
if [ "$?" = 0 ]; then
  cp ./extras/htaccess ../BackEnd/public/web/.htaccess
fi
