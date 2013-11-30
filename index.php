<?php require_once 'config.php'; ?>
<!doctype html>
<html>
<head>
  <title>
    DBRacer
  </title>

  <link rel='stylesheet' type='text/css' href='http://fonts.googleapis.com/css?family=Fascinate' />
  <link rel='stylesheet' type='text/css' href='dbracer.css' />
  
</head>

<body>
  <div id='background'>
  </div>
  
  
  <div id='players' class='container'>
    <ul>
      <li>
        <button id='btnStatus1' class='btnStatus'>
          Player 1 waiting...
        </button>
      </li>
      <li>
        <button id='btnStatus2' class='btnStatus'>
          Player 2 waiting...
        </button>
      </li>
      <li>
        <button id='btnStatus3' class='btnStatus'>
          Player 3 waiting...
        </button>
      </li>
      <li>
        <button id='btnStatus4' class='btnStatus'>
          Player 4 waiting...
        </button>
      </li>
      <li>
        <button id='btnStatus5' class='btnStatus'>
          Player 5 waiting...
        </button>
      </li>
      <li>
        <button id='btnStatus6' class='btnStatus'>
          Player 6 waiting...
        </button>
      </li>
    </ul>
    
    <div class='clearFix'>
    </div>
  </div>
  
  <div class='container'>
    <div id='preGame'>
      <button id='btnReady'>Ready?</button>  
    </div>
    
    <div id='game'>
    </div>
  </div>
  

  <script src='http://code.jquery.com/jquery-1.10.2.min.js'></script>
  <script src="js/socket.js"></script>
  <script src="js/database.js"></script>
  <script src="js/eventHandlers.js"></script>

  
  <script>
    $(document).ready(function(){
      var i;
      
      for (i = 0; i < 100; i++)
        $("#background").append("DBRacer ");
        
      window.socket = new Socket("<?= $host ?>", "<?= $port ?>", "server.php");
      socket.connect();
      
      $("#btnReady").on('click', connectionHandler({id : myId, message : "READY"});
      
      

      


    });
    
    function fillDiv(id, text) {
      var i;
      
      for (i = 0; i < 100; i++)
        $(id).append(text);
    }
  
  </script>  
  
</body>
</html>
