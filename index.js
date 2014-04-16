var request = require('request');
var csv = require('csv');

request('http://finance.yahoo.com/d/quotes.csv?s=IVV&f=l1', function (error, response, body) {
	if (!error && response.statusCode == 200) {
		console.log(body);
	}
});
request('http://ichart.finance.yahoo.com/table.csv?s=IVV&a=05&b=15&c=2000&d=04&e=15&f=2014&g=d&ignore=.csv', function (error, response, body) {
	if (!error && response.statusCode == 200) {
		csv()
			.from.string(body)
			.to.array( function(data){
				console.log(data.length);
			});
	}
});

