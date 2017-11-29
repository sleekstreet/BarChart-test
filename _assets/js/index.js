var _this = this;

var sortJSON = function () {
	// This is the sort machine of the watchlist. It saves the data in a closure and sorts at will by hyper link triggers on the title head of the "#stockFeeds" area
	let dataJSON = {},
	    order = "acend",
	    sortType = "numeric",
	    col = "change";

	function datafeed(data) {
		dataJSON = data;
	}
	function alpha(col, order) {
		dataJSON.sort((a, b) => {
			let nameA = a[col].toUpperCase(),
			    nameB = b[col].toUpperCase(); // ignoring upper and lowercase
			//console.log("nameA: "+nameA+" nameB: "+nameB);
			if (nameA < nameB && order === "acend") {
				return -1;
			} else if (nameA < nameB && order === "decend") {
				return 1;
			} else if (nameA > nameB && order === "acend") {
				return 1;
			} else if (nameA > nameB && order === "decend") {
				return -1;
			} else {
				return 0;
			} // names must be equal
		});
		console.log(dataJSON);
		parseJSON(dataJSON);
	}
	function numeric(col, order) {
		/*let newJSON = mergeSort(dataJSON);
  
  	Using the merge sort function made by Alexander Kondov in his artical on "Programming with JS: Merge Sort" 
  // Split the array into halves and merge them recursively 
  function mergeSort (arr) {
    if (arr.length === 1) {
      // return once we hit an array with a single item
      return arr
    }
  	  const middle = Math.floor(arr.length / 2) // get the middle item of the array rounded down
    const left = arr.slice(0, middle) // items on the left side
    const right = arr.slice(middle) // items on the right side
  	  return merge(
      mergeSort(left),
      mergeSort(right)
    )
  }
  	// compare the arrays item by item and return the concatenated result
  function merge (left, right) {
    let result = []
    let indexLeft = 0
    let indexRight = 0
  	  while (indexLeft < left.length && indexRight < right.length) {
      if (left[indexLeft] < right[indexRight]) {
        result.push(left[indexLeft])
        indexLeft++
      } else {
        result.push(right[indexRight])
        indexRight++
      }
    }
  	  return result.concat(left.slice(indexLeft)).concat(right.slice(indexRight))
  }
  console.log(newJSON);
  parseJSON(newJSON);
  */
		//My original sort. It's unstable in some browsers
		dataJSON.sort((a, b) => {
			console.log("numberA: " + a[col] + " numberB: " + b[col]);
			if (orderSign = "acend") {
				return parseFloat(a[col]) + parseFloat(b[col]);
			} else {
				return parseFloat(a[col]) - parseFloat(b[col]);
			}
		});
		parseJSON(dataJSON);
	}
	return { //These first two methods just set the internal properties to the user's viewing criteria
		acend: function (column, type) {
			order = "acend";
			sortType = type;
			col = column;
			console.log("data in closure: " + order + " " + sortType + " " + col + " Called acend");
		},
		decend: function (column, type) {
			order = "decend";
			sortType = type;
			col = column;
			console.log("data in closure: " + order + " " + sortType + " " + col + " Called decend");
		}, //This method saves/updates the data used to sort 
		populate: function (data) {
			datafeed(data);
			//console.log("data in closure: "+dataJSON);
		}, //This method calls the functions and feeds the correct sort data to get the job done.
		display: function () {
			if (sortType === "alpha") {
				alpha(col, order);
			} else {
				numeric(col, order);
			}
		}

	};
};

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
	date.setTime(date.getTime() + days2expire * 24 * 60 * 60 * 1000);
	var expires = date.toUTCString();
	document.cookie = name + '=' + value + ';' + 'expires=' + expires + ';' + 'path=' + path + ';';
}
function retrieve_cookie(name) {
	var cookie_value = "",
	    current_cookie = "",
	    name_expr = name + "=",
	    all_cookies = document.cookie.split(';'),
	    n = all_cookies.length;

	for (var i = 0; i < n; i++) {
		current_cookie = all_cookies[i].trim();
		if (current_cookie.indexOf(name_expr) == 0) {
			cookie_value = current_cookie.substring(name_expr.length, current_cookie.length);
			break;
		}
	}
	return cookie_value;
}
function parseJSON(dataJSON) {
	let c = 0,
	    displayHead,
	    displayBody = "";
	if (typeof dataJSON === 'string') {
		$('#stockFeeds').html(dataJSON);
	} else {
		displayHead = '<td><a href="#" data-field="symbol" data-order=""> Symbol</a><i class="fa fa-caret-down" id="symbolArow"></i></td><td><a href="#" data-field="name" data-order="">Symbol Name</a><i id="nameArow"></i></td><td><a href="#" data-field="last" data-order="">Last Price</a><i id="lastArow"></i></td><td><a href="#" data-field="change" data-order="">Change</a><i id="changeArow"></i></td><td><a href="#" data-field="pctchange" data-order="">%Change</a><i id="pctchangeArow"></i></td><td><a href="#" data-field="volume" data-order="">Volume</a><i id="volumeArow"></i></td><td><a href="#" data-field="tradetime" data-order="">Time</a><i id="tradetimeArow"></i></td><td></td>';
		dataJSON.map(v => {
			if (c === 0) style = 'grayBg';else {
				style = 'whiteBg';
			}
			displayBody += '<tr class="' + style + '">';
			displayBody += '<td>' + v['symbol'] + '<td>' + v['name'] + '<td>' + v['last'] + '</td><td>' + v['change'] + '</td><td>' + v['pctchange'] + '%</td><td>' + v['volume'].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") + '</td><td>' + v['tradetime'] + '</td><td><a href="delete?stockSymbol=' + v['symbol'] + '">X</a></td></tr>';
			if (c >= 1) c = 0;else {
				c++;
			}
		});

		$('#stockFeeds thead').html(displayHead);
		$('#stockFeeds tbody').html(displayBody);
	}
	if (dataJSON === null) {
		$('#LoginModal i').html("Login Error: Check Username and Password");
		$('#LoginModal').modal('show');
	}
}

jQuery($ => {

	var sortData = sortJSON(); //Bring in the sorting function machine to use within the jQuery 

	let cookie = retrieve_cookie('StUsr'),
	    a = function (field) {
		//ascending set up function
		$("#stockFeeds i").removeClass();
		$("#stockFeeds #" + field + "Arow").addClass("fa fa-caret-down");
		if (field === "symbol" || field === "name") {
			sortData.acend(field, "alpha");
			sortData.display();
		} else {
			sortData.acend(field, "numeric");sortData.display();
		}
	},
	    b = function (field) {
		//descending set up function
		$("#stockFeeds i").removeClass();
		$("#stockFeeds #" + field + "Arow").addClass("fa fa-caret-up");
		if (field === "symbol" || field === "name") {
			sortData.decend(field, "alpha");
			sortData.display();
		} else {
			sortData.decend(field, "numeric");sortData.display();
		}
	};
	//Toggle the asending and desending sort functions
	$("#fields").on("click", "a", e => {
		e.preventDefault();
		console.log(e);
		let field = e.currentTarget.dataset.field;
		return (_this.tog = !_this.tog) ? a(field) : b(field);
	});

	//Checking the cookie to see if it's established and valid. If not go to login modal
	if (cookie === null || cookie === "") {
		$('#LoginModal').modal('show');
	} else {

		let jqxhr = $.post("../barchart-test/api/index.php/stocks/QuoteView", { "CookieVal": cookie }).done().fail(() => {
			$('#stockFeeds').html("Server Error");
		}).always(data => {
			let dataJSON = JSON.parse(data);
			sortData.populate(dataJSON); //populates the sorter with our new data from the database
			sortData.display(); //This popoerly
		});
	}

	// Login form submittal to api and set up experience
	$('form[name=login]').submit(e => {
		e.preventDefault();

		$('#LoginModal').modal('hide');
		let jqxhr = $.post("../barchart-test/api/index.php/stocks/login", $('form[name=login]').serialize()).done(data => {

			//create_cookie(data.stCokiName, data.stCokiVal, 5, '/');
			if (data === null) {
				$('#LoginModal i').html("Login Error: Check Username and Password");
				$('#LoginModal').modal('show');
			}
		}).fail(() => {
			$('#stockFeeds').html("Server Error");
		}).always(data => {
			let dataJSON = JSON.parse(data);
			create_cookie(dataJSON['stCokiName'], dataJSON['stCokiVal'], 5, '/');
			sortData.populate(dataJSON); //populates the sorter with our new data from the database
			sortData.display(); //This popoerly
		});
	});

	$('form[name=stocks]').submit(e => {
		e.preventDefault();
		let jqxhr = $.post('../barchart-test/api/index.php/stocks/add', { "hash": cookie, "stockSymbol": $('input[name=stockSymbol').val() }).done().fail(() => {
			$('#stockFeeds').html("Server Error");
		}).always(data => {
			if (data === "not added") {
				$('#message').text('"' + $('input[name=stockSymbol').val() + '" has already been added to your watchlist');
			} else {
				let dataJSON = JSON.parse(data);
				sortData.populate(dataJSON); //populates the sorter with our new data from the database
				sortData.display(); //This popoerly
			}
			$('#inlineFormInput').val("");
		});
	});
	$("#stockFeeds tbody").on("click", "a", e => {
		e.preventDefault();
		$('#message').text("");
		let link = e.currentTarget.href,
		    symbol = link.split("="),
		    jqxhr = $.post('../barchart-test/api/index.php/stocks/delete', { "hash": cookie, "stockSymbol": symbol[1] }).done().fail(() => {
			$('#stockFeeds').html("Server Error");
		}).always(data => {
			let dataJSON = JSON.parse(data);
			sortData.populate(dataJSON);
			sortData.display();
		});
	});
});
