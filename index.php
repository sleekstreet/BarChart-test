<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<title>BarChart Test</title>


	<link rel="stylesheet" href="_assets/css/style.css"/>
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/css/bootstrap.min.css" integrity="sha384-rwoIResjU2yc3z8GV/NPeZWAv56rSmLldC3R/AZzGRnGxQQKnKkoFVhFQhNUwEyJ" crossorigin="anonymous">
	<link rel="stylesheet" href="_assets/css/font-awesome-4.7.0/css/font-awesome.min.css">
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
	<script src="https://www.atlasestateagents.co.uk/javascript/tether.min.js"></script>
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/js/bootstrap.min.js" integrity="sha384-vBWWzlZJ8ea9aCX4pEW3rVHjgjt7zpkNpZk+02D9phzyeVkE+jo0ieGizqPLForn" crossorigin="anonymous"></script>
	<script src="_assets/js/index.js" type="text/javascript"></script>
</head>
<body>

<div class="container">
	<h1>Stock Quotes</h1>
	<div class="box">
		<div class="header">
			<div class="input-group mb-2 mr-sm-2 mb-sm-0">
			    <i class="fa fa-line-chart" aria-hidden="true"></i>
			    <form method="post" name="stocks">
			    	<input type="text" id="inlineFormInput" name="stockSymbol">
			    	<button>Add Symbol</button>
			    </form>
			    <small><i class="red" id="message"></i></small>
		  	</div>
		</div>
		<div id="stockFeeds">
			<table>
				<thead id="fields"></thead>
				<tbody></tbody>
			</table>
		</div>
	</div>
	<footer>
		
	</footer>
</div>

<div class="modal fade" id="LoginModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Login</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <form name="login" method="post">
      	<div class="modal-body">
        	<label for="username">Username</label><input type="text" name="username"/><br/>
        	<label for="password">Password</label><input type="password" name="password"/>
        	<i class="Error" id="LoginError"></i>
	    </div>
	    <div class="modal-footer">
	        <button type="submit" class="btn btn-primary">Submit Login</button>
	    </div>
	  </form>
    </div>
  </div>
</div>


</body>
</html>