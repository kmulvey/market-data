var request = require('request');
var csv = require('csv');
var mysql = require('mysql');

var MA_PERIOD = 20;
var ME_PERIOD_RES = 120;
var twenty_ma_arr = new Array();
var twenty_ma = 0;
var price_line_status = "";

/*
var tick_num = 0;
setInterval(function(){
  request('http://finance.yahoo.com/d/quotes.csv?s=GOOG&f=l1', function (error, response, body) {
  if (!error && response.statusCode == 200) {
    tick_num++;

    var tick = parseFloat(body.trim());
			
    if(tick_num % ME_PERIOD_RES == 0){
    // size the array
    if(twenty_ma_arr.length >= MA_PERIOD){
      twenty_ma_arr.pop();
    }
    // put new data on the array
    twenty_ma_arr.unshift(tick);
			
    // calc the moving average
    var sum = 0;
    for(var i=0; i<twenty_ma_arr.length; i++){
      sum += twenty_ma_arr[i];
    }
    twenty_ma = sum/twenty_ma_arr.length;
  }
	
  if(twenty_ma_arr.length == MA_PERIOD){ 
    if(tick > twenty_ma){
      if(price_line_status != "above") {
						console.log("it crossed going up ... SELL & SHORT", twenty_ma, tick);
						price_line_status = "above";
					}
				}
				else if(tick < twenty_ma){
					if(price_line_status != "below") {
						console.log("it crossed going down ... BUY & COVER: ", twenty_ma, tick);
						price_line_status = "below";
					}
				}
			}
		}
	});
}, 1000);
*/
request('http://ichart.finance.yahoo.com/table.csv?s=IVV&a=05&b=15&c=2000&d=04&e=15&f=2014&g=d&ignore=.csv', function (error, response, body) {
  if (!error && response.statusCode == 200) {
    csv()
      .from.string(body)
      .to.array( function(data){
        console.log(data);
      });
  }
});



function handleDisconnect() {
  connection = mysql.createConnection(config); 

  connection.connect(function(err) { 
    if(err) {
      console.log('error when connecting to db:', err);
      setTimeout(handleDisconnect, 2000); 
    } 
    else{
      console.log('connected to db');
    }
  });                                     
  
  connection.on('error', function(err) {
    console.log('db error', err);
    if(err.code === 'PROTOCOL_CONNECTION_LOST') {
      handleDisconnect(); 
    } else {
      throw err; 
    }
  });
}

handleDisconnect();
