<?php

  echo "checking for running processes\n";
  $pid = `lsof -t -i:443`;

  echo "attempting to kill: $pid\n";
  `kill -9 $pid`;

  echo "pulling from origin master\n";
  
  `git pull origin master`;
  
  `php -q server.php`;

?>