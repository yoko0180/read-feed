
var main = require('../dist/main.js');
// var {SomeLibrary} = require('../dist/main.js');
// var main = require('../dist/bundle.js');
// var main = require('../index3.js');

main('https://news.yahoo.co.jp/pickup/rss.xml').then( result => {
  console.log(result.length)
  if (result.length > 0)
  console.log(Object.keys(result[0]))
})
.catch(console.error)