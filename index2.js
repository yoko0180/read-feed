var FeedParser = require('feedparser');
var request = require('request');

/** DEBUG ****************/
// const debug = () => {}
const debug = console.log
// ************************

var getfeed = function(feed) {

  var feedparser = new FeedParser({});
  var items = [];

  return new Promise((resolve, reject) => {

    let options = {
      url: feed,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.63 Safari/537.36',
        'accept': 'text/html,application/xhtml+xml'
      }
    };
    
    function callback(error, response, body) {
      if (!error && response.statusCode == 200) {
        // var info = JSON.parse(body);
        // console.log(info.stargazers_count + " Stars");
        // console.log(info.forks_count + " Forks");
        response.pipe(feedparser)
      } else {
        reject(error)
      }
    }
     
    request(options, callback)

    feedparser.on('readable', function () {
      while (item = this.read()) {
        items.push(item);
      }
    });

    function print_item_keys(item) {
      for (var k in item) {
        console.log(k);
      }
    }

    feedparser.on('end', function () {
      // show titles
      // items.forEach(function (item) {
      //   console.log(`${item.guid}` + '- [' + item.title + ']' + '(' + item.link + ')');
      //   // console.log(item);
      // });
      // print_item_keys(items[0])
      resolve(items);
    });

    feedparser.on('error', function (error) {
      // reject(error);
    });
  });
};

module.exports = getfeed;
