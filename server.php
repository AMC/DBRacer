<?php

  require_once 'serverFunctions.php';
  require_once 'config.php';

  $clients    = array();
  $clientsIP  = array();
  $maxClients = 6;

  // required for socket_select
  $NULL = NULL;

  // echo "<pre>";
  echo "\n\n\n";
  echo "PHP version: ";
  echo phpversion() + "\n";
  echo "DBRacer serving starting...\n";
  echo "host: $host \n";
  echo "port: $port \n";

  set_time_limit(0);

  // output buffering will be implicitly flushed
  ob_implicit_flush(true);

  echo "creating socket...\n";
  $socket = socket_create(AF_INET, SOCK_STREAM, SOL_TCP);
  $clients[0] = $socket;
  $clientsIP[0] = NULL;

  // SO_REUSEADDR : reuse local address
  socket_set_option($socket, SOL_SOCKET, SO_REUSEADDR, 1);

  echo "binding socket...\n";
  // $address = 0 accepts all clients
  socket_bind($socket, 0, $port)
    or die ("Could not bind to address.\n");

  echo "listening to socket...\n\n";
  socket_listen($socket);


  while(true) {
  
    $socketsToRead = $clients;
    
    // if there are no clients with data, go to next iterations
    if (socket_select($socketsToRead, $NULL, $NULL, 0, 10) < 1)
      continue;
  
    // check for new client connection
    if (in_array($socket, $socketsToRead)) {
      echo "accepting new connection...\n";
      
      $newSocket = socket_accept($socket);
      $header = socket_read($newSocket, 1024);

      echo "initiating handshake with $clientsIP[$id]...\n";
      ws_handshake($header, $newSocket, $host, $port);


      if (count($clients) <= $maxClients) {
        $clients[get_open_index($clients, $maxClients)] = $newSocket;
        $id = array_search($newSocket, $clients);
        socket_getpeername($newSocket, $clientsIP[$id]);
      
        $response = create_frame("CONNECTIONS", array(
          'message' => "CONNECTED",
          'id'      => $id,
        ));

        echo "sending welcome message:\n";
        echo "$response \n";

        send_frame($newSocket, $response);

        echo "notifying new client of existing connections...\n";
        // ignores original socket
        foreach($clients as $client) {
          $i = array_search($client, $clients);
          if ($clients[$i] != $newSocket && $clientsIP[$i] != NULL) {
            $response = create_frame("CONNECTIONS", array(
              'message' => 'NEW_CONNECTION',
              'id'      => $i,
              'ip'      => $clientsIP[$i],
            ));
          
            echo "$response \n";
            send_frame($newSocket, $response);
          }
        }
      
        $response = create_frame("CONNECTIONS", array(
          'message' => "NEW_CONNECTION",
          'id'      => $id,
          'ip'      => $clientsIP[$id],
        ));
      
        echo "notifying clients of new connection...\n";
        echo "$response \n";
      
        foreach ($clients as $client) {
          $i = array_search($client, $clients);
          if ($clients[$i] != $newSocket && $clientsIP[$i] != NULL)
            send_frame($clients[$i], $response);
        }
      } else {
        $response = create_frame("CONNECTIONS", array(
          'message' => "CONNECTION_REFUSED",
        ));

        echo "maximum users exceeded:\n";
        echo "$response \n";
        
        send_frame($newSocket, $response);
      }
      
      echo "removing new client from the \$socketsToRead array...\n";
      $index = array_search($socket, $socketsToRead);
      unset($socketsToRead[$index]);
      
      echo "\n";

    } // end check for new client connection


    // check clients for incoming data
    foreach ($socketsToRead as $readSocket) {
      $index = array_search($readSocket, $clients);
      
      echo "receiving data...\n";
      
      while(socket_recv($readSocket, $frameIn, 1024, 0) >= 1) {

        $temp = json_decode(unmask($frameIn));
        $frameOut = create_frame($temp->channel, $temp->data);
        
        echo "notifying clients of new message...\n";
        echo "$frameOut \n";
        foreach ($clients as $client)
          if ($client != $readSocket && $client != $socket)
            send_frame($client, $frameOut);
            
        break 2;
      }
      
      $frame = @socket_read($readSocket, 1024, PHP_NORMAL_READ);

      
      // check if client disconnected
      if ($frame === false) {
        echo "client $id disconnected...\n";
        unset($clients[$index]);

        $frame = create_frame("CONNECTIONS", array(
          'message' => "CLOSED_CONNECTION",
          'id'      => $index,
        ));

        echo "notifying clients of disconnect...\n";
        echo "$frame \n";
        foreach ($clients as $client)
          send_frame($client, $frame);
        
      } 
        
    } // end checking clients for incoming data
  } // end while


  socket_close($socket);