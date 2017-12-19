
//import {assert, spy, stub} from './node_modules/sinon/lib/sinon.js';
//var sinon = require('sinon');

var sortJSON = () => {
	// This is the sort machine of the watchlist. It saves the data in a closure and sorts at will by hyper link triggers on the title head of the "#stockFeeds" area
	let dataJSON = {},
	    order = "acend",
	    sortType = "numeric",
	    col = "change";

	function datafeed(data) {
		dataJSON = data;
	}
	function alpha() {
		dataJSON.sort((a, b) => {
			let nameA = a[col].toUpperCase(),
			    nameB = b[col].toUpperCase(); // ignoring upper and lowercase

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

		parseJSON(dataJSON);
	}
	function numeric() {

		let newJSON = mergeSort(dataJSON, order);

		//	Using the merge sort idea I found reading Alexander Kondov's article on "Programming with JS: Merge Sort" 
		// Split the array into halves and merge them recursively 
		function mergeSort(arr, order) {

			if (arr.length === 1) {
				// return once we hit an array with a single item
				return arr;
			}

			const middle = Math.floor(arr.length / 2); // get the middle item of the array rounded down
			const left = arr.slice(0, middle); // items on the left side
			const right = arr.slice(middle); // items on the right side

			return merge(mergeSort(left, order), mergeSort(right, order), order, col);
		}

		// compare the arrays item by item and return the concatenated result
		function merge(left, right, order, col) {
			let result = [],
			    indexLeft = 0,
			    indexRight = 0,
			    output;

			if (order === "decend") {
				while (indexLeft < left.length && indexRight < right.length) {

					if (parseFloat(left[indexLeft][col]) > parseFloat(right[indexRight][col])) {
						result.push(left[indexLeft]);
						indexLeft++;
					} else {
						result.push(right[indexRight]);
						indexRight++;
					}

					output = result.concat(left.slice(indexLeft)).concat(right.slice(indexRight));
				}
			} else {
				while (indexLeft < left.length && indexRight < right.length) {

					if (parseFloat(left[indexLeft][col]) < parseFloat(right[indexRight][col])) {
						result.push(left[indexLeft]);
						indexLeft++;
					} else {
						result.push(right[indexRight]);
						indexRight++;
					}

					output = result.concat(left.slice(indexLeft)).concat(right.slice(indexRight));
				}
			}

			return output;
		}

		parseJSON(newJSON);

		//My original sort. It has unstable Numeric output in some browsers. This is why I am creating a better wheel that works everywhere.
		/*dataJSON.sort((a,b)=>{console.log("numberA: "+a[col]+" numberB: "+b[col]);
  	if (orderSign = "acend"){return parseFloat(a[col]) + parseFloat(b[col]);}
  	else{return parseFloat(a[col]) - parseFloat(b[col]);}
  })
  parseJSON(dataJSON);
  */
	}
	return {
		//This method saves/updates the data used to sort 
		status: function () {
			return [order, col];
		}, //	This method just updates the json data we use in the sort.
		populate: function (data) {
			datafeed(data);
		}, //This method calls the functions and feeds the correct sort data to get the job done.
		display: function (column, type) {

			if (column === col && order === "acend") {
				order = "decend";
			} else if (column !== col) {
				order = "acend";col = column;
			} else {
				order = "acend";
			}

			if (type === "alpha") {
				alpha();
			} else {
				numeric();
			}
		}

	};
};

// Sinon Test

//var sortJSONspy = sinon.spy(sortJSON, 'numeric');

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

		$('#stockFeeds tbody').html(displayBody);
	}
	if (dataJSON === null) {
		$('#LoginModal i').html("Login Error: Check Username and Password");
		$('#LoginModal').modal('show');
	}
}

jQuery($ => {

	let sortData = sortJSON(),
	    //Bring in the sorting function machine to use within the jQuery 
	cookie = retrieve_cookie('StUsr');
	checkOrder(null);

	//Toggle the asending and desending sort functions
	$("#fields").on("click", "a", e => {
		e.preventDefault();

		$("#stockFeeds i").removeClass();

		let field = e.currentTarget.dataset.field,
		    sortStatus = sortData.status();

		if (field === "symbol" || field === "name") {
			sortData.display(field, "alpha");
		} else {
			sortData.display(field, "numeric");
		}
		checkOrder(field);
	});

	//Checking the cookie to see if it's established and valid. If not go to login modal
	if (cookie === null || cookie === "") {
		$('#LoginModal').modal('show');
	} else {

		let jqxhr = $.post("../barchart-test/api/index.php/stocks/QuoteView", { "CookieVal": cookie }).done(() => {}).fail(() => {
			$('#stockFeeds').html("Server Error Connection may not have been established");
		}).always(data => {
			let dataJSON = JSON.parse(data);
			sortData.populate(dataJSON); //populates the sorter with our new data from the database
			sortData.display(); // Display Data Using previous settings
		});
	}

	// Login form submittal to api and set up experience
	$('form[name=login]').submit(e => {
		e.preventDefault();

		$('#LoginModal').modal('hide');
		let jqxhr = $.post("../barchart-test/api/index.php/stocks/login", $('form[name=login]').serialize()).done(data => {

			if (data === null) {
				$('#LoginModal i').html("Login Error: Check Username and Password");
				$('#LoginModal').modal('show');
			}
		}).fail(() => {
			$('#stockFeeds').html("Server Error Connection may not have been established");
		}).always(data => {
			let dataJSON = JSON.parse(data);
			create_cookie(dataJSON['stCokiName'], dataJSON['stCokiVal'], 5, '/');
			sortData.populate(dataJSON['stocks']); //populates the sorter with our new data from the database
			sortData.display(); //Display Data Using previous settings
		});
	});

	$('form[name=stocks]').submit(e => {
		e.preventDefault();
		let jqxhr = $.post('../barchart-test/api/index.php/stocks/add', { "hash": cookie, "stockSymbol": $('input[name=stockSymbol').val() }).done().fail(() => {
			$('#stockFeeds').html("Server Error Connection may not have been established");
		}).always(data => {
			if (data === "not added") {
				$('#message').text('"' + $('input[name=stockSymbol').val() + '" has already been added to your watchlist');
			} else {
				let dataJSON = JSON.parse(data);
				sortData.populate(dataJSON); //populates the sorter with our new data from the database
				sortData.display(); // Display Data Using previous settings
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
			$('#stockFeeds').html("Server Error Connection may not have been established");
		}).always(data => {
			let dataJSON = JSON.parse(data);
			sortData.populate(dataJSON); //populates the sorter with our new data from the database
			sortData.display(); // Display Data Using previous settings
		});
	});

	function checkOrder(field) {
		//Check closure to see if we what order we are displaying our data

		let StartStatus = sortData.status();
		if (field === null) {
			field = StartStatus[1];
		}
		//console.log(StartStatus);
		if (StartStatus[0] === "acend") {
			$("#stockFeeds #" + field + "Arow").addClass("fa fa-chevron-circle-up");
		} else {
			$("#stockFeeds #" + field + "Arow").addClass("fa fa-chevron-circle-down");
		}
	}
});
