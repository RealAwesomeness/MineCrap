const fs = require('fs');
const request = require("request");
const { exec } = require('child_process');
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
function minerHandling (error, stat, algo, miner, speed) {
	if (error) console.error('Error retrieving data : ' + error)
	else console.log('Benchmark speed of ' + coin + ' : ' + price)
#the srbminer function isnt finished!
function srbminer(stat,algo,callback) {
	var url = "http://127.0.0.1:21555/"
	stat = stat.toLowerCase()
	console.log(stat)
	exec('cd srbminer\nsrbminer.exe --', (err, stdout, stderr) => {
		if (err) {
			// node couldn't execute the command
			callback(err)
			return;
		}

		// the *entire* stdout and stderr (buffered)
		console.log(`stdout: ${stdout}`);
		console.log(`stderr: ${stderr}`);
});
	speed = 0
	while (speed!=0) {
		request(url, function (error, response, body) {
				if (!error && response.statusCode == 200) {
					jsonfromwebsite = JSON.parse(body);
					speed=jsonfromwebsite.hashrate_total_5min
				}
		})
	}
	callback(null, stat, algo, "srbminer", speed)
}
function bench(function, stat, algo, callback, callbackdos) {
	callbackdos(function(stat, algo, callback))
}
cryptobridge("rvn",exchangeHandling)
tradeogre("xhv",exchangeHandling)
