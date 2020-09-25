const {assert} = require('chai');
const {getfeed} = require('../dist/index');


describe('# reed-feed test', function() {
  const channelsData = [
    {"id":"SJRdqj4Hr","name":"ライブドアニュース - 国内トピックス",
    "url":"http://news.livedoor.com/topics/rss/dom.xml"},
    {"id":"BJLDh1HBB","name":"lifehacker",
    "url":"http://www.lifehacker.jp/index.xml"},
    {"id":"BJeUw21SBS","name":"gigazine",
    "url":"http://gigazine.net/index.php?/news/rss_2.0/"},
    {"id":"r1WUw3yHrB","name":"ハム速",
    "url":"http://hamusoku.com/index.rdf"},
    {"id":"BkfIDnyrBS","name":"Factorio",
    "url":"http://steamcommunity.com/games/427520/rss/"},
    {"id":"Sy7LwnkBBH","name":"PCパーツまとめ",
    "url":"http://blog.livedoor.jp/bluejay01-review/index.rdf"},
    {"id":"HyNLvhkrSH","name":"ライブドアニュース - 国内トピックス",
    "url":"http://news.livedoor.com/topics/rss/dom.xml"},
    {"id":"r1DDhyrBr","name":"Books&Apps",
    "url":"http://blog.tinect.jp/?feed=rss2"}]

  for (let channel of channelsData) {
    it('アイテムが取得できること ' + channel.name, function() {
      return getfeed(channel.url).then( result => {
        assert.ok(result instanceof Array, 'resultがArrayでない')
        assert.ok(result.length > 0, 'アイテムが取得できていない')

        const item = result[0]
        assert.hasAnyKeys(item, ['title', 'date'])
      })
    });
  }

  it('不正urlでcatchされること', function() {
    let catched = false

    return getfeed('failfailfail').then( result => {
      // assert.ok(result instanceof Array)
    })
    .catch( err => {
      assert.equal(err, 'Error: Invalid URI "failfailfail"')
      catched = true
    })
    .then(value => {
      assert.ok(catched, 'catchされていない')
    })
    
  });
    
});