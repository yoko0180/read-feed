# read-feed

```js
const reedfeed = require('reed-feed');
reedfeed('http://www.foo.baa/index.xml').then( result => {
  console.log(result.length)
  if (result.length > 0)
  console.log(Object.keys(result[0]))
  /* example
  [ 'title',
  'description',
  'summary',
  'date',
  'pubdate',
  'pubDate',
  'link',
  'guid',
  'author',
  'comments',
  'origlink',
  'image',
  'source',
  'categories',
  'enclosures',
  'rss:@',
  'rss:title',
  'rss:link',
  'rss:description',
  'rss:pubdate',
  'permalink',
  'rss:guid',
  'rss:category',
  'rss:enclosure',
  'dc:creator',
  'meta' ]
  */
}).catch(console.error)
```
