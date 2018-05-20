var FeedParser = require('feedparser');
var request = require('request');
var {maybeDecompress, maybeTranslate, getParams} = require('./parse');

/** DEBUG ****************/
// const debug = () => {}
const debug = console.log
// ************************

var getfeed = function(feed) {


  var feedparser = new FeedParser({});
  var items = [];


  return new Promise((resolve, reject) => {

    /**
     * ヘッダーを指定したうえでrequestのエラーハンドリングがわからなかったので苦肉の策でtry-catch
     */
    let req
    try {
      req = request(feed, { timeout: 10000, pool: false });
    }
    catch (err) {
      reject(err)
    }
    req.setMaxListeners(50);
    // Some feeds do not respond without user-agent and accept headers.
    req.setHeader('user-agent', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.63 Safari/537.36');
    req.setHeader('accept', 'text/html,application/xhtml+xml');
  
    req.on('response', function (res) {
      if (res.statusCode !== 200) {
        // this.emit('error', new Error('Bad status code'));
        reject(new Error('Bad status code'));
      }
      else {
        var encoding = res.headers['content-encoding'] || 'identity'
          , charset = getParams(res.headers['content-type'] || '').charset;
        res = maybeDecompress(res, encoding);
        res = maybeTranslate(res, charset);
        res.pipe(feedparser);
      }
    });

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
      reject(error);
    });
  });
};

module.exports = getfeed;
