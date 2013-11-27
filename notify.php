<?

  `git pull origin master`
  
  $pid = `lsof -t -i:4444`
  
  `kill -9 $pid`
  
  `php -q server.php`

?>