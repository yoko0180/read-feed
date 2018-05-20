var assert = require('assert');
var main = require('../index3');
const path = require('path')
let feedsFs

const fs = require('fs')
const debug = () => {}
// const debug = console.log

describe('# reed-feed parser-error', function() {
  
  before(function() {
  })

  after(function() {
  })

  it('test 1', function() {
 
    return main('https://feedly.com/i/subscription/feed%2Fhttp%3A%2F%2Fhamusoku.com%2Findex.rdf').then( result => {
      assert.ok(result instanceof Array)
      assert.ok(result.length > 0, 'アイテムが取得できていない')
    })
    .catch(console.error)
  });

    
});