<?php

  echo "checking for running processes\n";
  $pid = `sudo lsof -t -i:443`;

  echo "attempting to kill: $pid\n";
  `sudo kill -9 $pid`;

  echo "pulling from origin master\n";
  
  `git pull origin master`;
  
  `sudo php -q server.php`;

?>