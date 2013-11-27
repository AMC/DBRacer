<?

  echo "pulling from origin master";
  
  `git pull origin master`
  
  echo "checking for running processes";
  $pid = `lsof -t -i:4444`
  
  echo "attempting to kill $pid";
  `kill -9 $pid`
  
  `php -q server.php`

?>