<?php

  echo "checking for running processes...\n";
  echo "<br />";
  $pid = `lsof -t -i:4444`;
  echo "process: $pid";


?>