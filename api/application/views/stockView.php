<?php
defined('BASEPATH') OR exit('No direct script access allowed');
?><!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<title>Welcome to CodeIgniter</title>

	<link rel="stylesheet" href="_assets/css/style.css"/>
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/css/bootstrap.min.css" integrity="sha384-rwoIResjU2yc3z8GV/NPeZWAv56rSmLldC3R/AZzGRnGxQQKnKkoFVhFQhNUwEyJ" crossorigin="anonymous">
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
		  	</div>
		</div>
		<div id="stockFeeds"></div>
	</div>
	<footer>
		<p class="footer">Page rendered in <strong>{elapsed_time}</strong> seconds. <?php echo  (ENVIRONMENT === 'development') ?  'CodeIgniter Version <strong>' . CI_VERSION . '</strong>' : '' ?></p>
	</footer>
</div>


</body>
</html>