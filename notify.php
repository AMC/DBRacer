<?

  `git pull origin master`
  
  $pid = `lsof -t -i:4444`
  
  echo "attempting to kill $pid";
  
  `kill -9 $pid`
  
  `php -q server.php`

?>