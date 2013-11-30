<?php

  function ws_handshake($headerIn, $client, $host, $port) {
  	$headers = array();
  	$lines  = preg_split("/\r\n/", $headerIn);

  	foreach($lines as $line) {
  		$line = chop($line);
  		if(preg_match('/\A(\S+): (.*)\z/', $line, $matches))
  			$headers[$matches[1]] = $matches[2];
  	}

  	$secKey    = $headers['Sec-WebSocket-Key'];
  	$secAccept = base64_encode(pack('H*', sha1($secKey . '258EAFA5-E914-47DA-95CA-C5AB0DC85B11')));

  	$frame  = "HTTP/1.1 101 Web Socket Protocol Handshake\r\n" 
  	        . "Upgrade: websocket\r\n" 
            . "Connection: Upgrade\r\n" 
            . "WebSocket-Origin: $host\r\n" 
            . "WebSocket-Location: ws://$host:$port/server.php\r\n"
            . "Sec-WebSocket-Accept:$secAccept\r\n\r\n";

    send_frame($client, $frame);
  }
  
  function create_frame($channel, $data) {
    return mask(json_encode(array(
      'channel' => $channel,
      'data'    => $data,
    ), JSON_PRETTY_PRINT));
  }

  function send_frame($client, $frame) {
	  socket_write($client, $frame, strlen($frame));
  }
  
  function get_open_index($array, $length) {
    for ($i = 0; $i <= $length; $i++)
      if (!array_key_exists($i, $array))
        return $i;
  }


  // unmask incoming framed message
  function unmask($text) {
  	$length = ord($text[1]) & 127;
  	if ($length == 126) {
  		$masks = substr($text, 4, 4);
  		$data  = substr($text, 8);
  	} elseif ($length == 127) {
  		$masks = substr($text, 10, 4);
  		$data  = substr($text, 14);
  	} else {
  		$masks = substr($text, 2, 4);
  		$data  = substr($text, 6);
  	}
	
  	$text = "";
  	for ($i = 0; $i < strlen($data); ++$i) 
  		$text .= $data[$i] ^ $masks[$i%4];
	
  	return $text;
  }


  // encode message for transfer to client.
  function mask($text) {
  	$b1 = 0x80 | (0x1 & 0x0f);
  	$length = strlen($text);
	
  	if($length <= 125)
  		$header = pack('CC', $b1, $length);
  	elseif ($length > 125 && $length < 65536)
  		$header = pack('CCn', $b1, 126, $length);
  	elseif ($length >= 65536)
  		$header = pack('CCNN', $b1, 127, $length);

  	return $header.$text;
  }