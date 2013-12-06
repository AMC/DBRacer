<?php
  require_once 'config.php';

  echo "checking for running processes...\n";
  echo "<br />";
  $pid = `lsof -t -i:$port`;
  echo "process: $pid";


?>