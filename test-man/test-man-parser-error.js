const path = require('path')
const fs = require('fs')
var request = require('request');
// const url = 'https://feedly.com/i/subscription/feed%2Fhttp%3A%2F%2Fhamusoku.com%2Findex.rdf'
// request(url).pipe(fs.createWriteStream('hamu.txt'))

const url = 'http://b.hatena.ne.jp/entrylist?sort=hot&threshold=&mode=rss'
request(url).pipe(fs.createWriteStream('hatena.txt'))

