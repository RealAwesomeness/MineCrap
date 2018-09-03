const fs = require('fs');
const request = require("request");
String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};
function indexes(source, find) {
  var result = [];
  for (i = 0; i < source.length; ++i) {
    if (source.substring(i, i + find.length) == find) {
      result.push(i);
    }
  }
  return result;
}
function exchangeHandling (error, coin , price) {
  if (error) console.error('Error retrieving data : ' + error)
  else console.log('Retrieved price of ' + coin + ' : ' + price)
}
function cryptobridge(coin,callback) {
	var url = "https://api.crypto-bridge.org/api/v1/ticker"
	coin = coin.toUpperCase()
	original = coin
	coin = coin + "_BTC"
	request(url, function (error, response, body) {
		if (!error && response.statusCode == 200) {
			jsonfromwebsite = JSON.parse(body)
			for(var i = 0; i < jsonfromwebsite.length; i++) {
				currentcoin = jsonfromwebsite[i].id
				price = jsonfromwebsite[i].last
				if (currentcoin == coin) {
					callback(null,original,price)
				}
			}
		}
		else {
			callback("Error reaching website!")
		}
	
	})
}
function tradeogre(coin,callback) {
	var url = "https://tradeogre.com/api/v1/markets"
	coin = coin.toUpperCase()
	original = coin
	coin = "BTC_" + coin
	console.log(coin)
	request(url, function (error, response, body) {
			if (!error && response.statusCode == 200) {
				body = body.replaceAll("-","_")
				jsonfromwebsite = JSON.parse(body);
				for(var i = 0; i < jsonfromwebsite.length; i++) {
					currentcoin = Object.keys(jsonfromwebsite[i])[0];
					if (currentcoin == coin) {
						price = jsonfromwebsite[i][coin].price
						callback(null,original,price)
					}
				}
			}
	})
}
cryptobridge("rvn",exchangeHandling)
tradeogre("xhv",exchangeHandling)

