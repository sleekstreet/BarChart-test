
jQuery( ($) => {
	//Checking cookie for valid credentials
	let cookie = retrieve_cookie('StUsr');
	
	if(cookie === null || cookie===""){
		$('#LoginModal').modal('show');
	}
	else{

		let jqxhr = $.post("../barchart-test/api/index.php/stocks/QuoteView", {"CookieVal": cookie}).done().fail(()=>{
			$('#stockFeeds').html("Server Error");
		}).always((data)=>{
			let dataJSON = JSON.parse(data);
			parseJSON(dataJSON);
		});
	}


	// Login form submittal to api and set up experience
	$('form[name=login]').submit(e => {
		e.preventDefault();

		$('#LoginModal').modal('hide');
		let jqxhr = $.post("../barchart-test/api/index.php/stocks/login", $('form[name=login]').serialize()).done((data)=>{

				//create_cookie(data.stCokiName, data.stCokiVal, 5, '/');
				if(data === null){
					$('#LoginModal i').html("Login Error: Check Username and Password");
					$('#LoginModal').modal('show');
				}
			}).fail(()=>{
				$('#stockFeeds').html("Server Error")
			}).always((data)=>{
				let dataJSON = JSON.parse(data);
				create_cookie(dataJSON['stCokiName'], dataJSON['stCokiVal'], 5, '/');
				parseJSON(dataJSON['stocks'])
			});

	});

	$('form[name=stocks]').submit(e => {
		e.preventDefault();
		let jqxhr = $.post('../barchart-test/api/index.php/stocks/add', {"hash":cookie, "stockSymbol":$('input[name=stockSymbol').val()}).done().fail(()=>{
			$('#stockFeeds').html("Server Error");
		}).always((data)=>{
			let dataJSON = JSON.parse(data);
			parseJSON(dataJSON);
			$('#inlineFormInput').val("");
		})
	})
	$("#stockFeeds").on("click", "a", (e => {
		e.preventDefault();
		let link=e.currentTarget.href, symbol = link.split("="), jqxhr = $.post('../barchart-test/api/index.php/stocks/delete', {"hash":cookie, "stockSymbol":symbol[1]}).done().fail(()=>{
			$('#stockFeeds').html("Server Error");
		}).always((data)=>{
			let dataJSON = JSON.parse(data);
			parseJSON(dataJSON);
		})
	})
	)
});



/*******************************
 * Create cookie with javascript
 *
 * @param {string} name cookie name
 * @param {string} value cookie value
 * @param {int} days2expire
 * @param {string} path
 */
function create_cookie(name, value, days2expire, path) {
  var date = new Date();
  date.setTime(date.getTime() + (days2expire * 24 * 60 * 60 * 1000));
  var expires = date.toUTCString();
  document.cookie = name + '=' + value + ';' +
                   'expires=' + expires + ';' +
                   'path=' + path + ';';
}
function retrieve_cookie(name) {
  var cookie_value = "",
    current_cookie = "",
    name_expr = name + "=",
    all_cookies = document.cookie.split(';'),
    n = all_cookies.length;
 
  for(var i = 0; i < n; i++) {
    current_cookie = all_cookies[i].trim();
    if(current_cookie.indexOf(name_expr) == 0) {
      cookie_value = current_cookie.substring(name_expr.length, current_cookie.length);
      break;
    }
  }
  return cookie_value;
}
function parseJSON(dataJSON){
	let c=0,display;
	if(typeof dataJSON==='string'){$('#stockFeeds').html(dataJSON);}
	else {
		display="<table><thead><td>Symbol</td><td>Symbol Name</td><td>Last Price</td><td>Change</td><td>%Change</td><td>Volume</td><td>Time</td><td></td></thead>";
		dataJSON.map(v => {
			if(c===0)style='grayBg';
			else{style='whiteBg';}
			display+='<tr class="'+style+'">';
			display+='<td>'+v['symbol']+'<td>'+v['name']+'<td>'+v['last']+'</td><td>'+v['change']+'</td><td>'+v['pctchange']+'%</td><td>'+v['volume'].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")+'</td><td>'+v['tradetime']+'</td><td><a href="barchart-test/api/index.php/del?stockSymbol='+v['symbol']+'">X</a></td></tr>';
			if(c>=1)c=0;
			else{c++;}
		})
		display+="</table>"
		$('#stockFeeds').html(display);
	}
	if(dataJSON=== null){
		$('#LoginModal i').html("Login Error: Check Username and Password");
		$('#LoginModal').modal('show');
	}
}

