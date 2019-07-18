
var main = require('../index3');

main('https://news.yahoo.co.jp/pickup/rss.xml').then( result => {
  console.log(result.length)
  if (result.length > 0)
  console.log(Object.keys(result[0]))
})
.catch(console.error)