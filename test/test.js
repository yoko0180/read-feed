var assert = require('assert');
var main = require('../index');
const path = require('path')
let feedsFs

const fs = require('fs')
const debug = () => {}
// const debug = console.log

describe('# reed-feed', function() {
  
  before(function() {
  })

  after(function() {
  })

  it('test 1', function() {
    // {
    //   name:'lifehacker', 
    //   feed:'http://www.lifehacker.jp/index.xml'
    // },
  
    let thened = false
    return main('http://www.lifehacker.jp/index.xml').then( result => {
      // thened = true
      // assert.ok(thened, 'then になっていない')
      assert.ok(result instanceof Array)
      assert.ok(result.length > 0, 'アイテムが取得できていない')
    })
    .catch(console.error)
  });

  it('test fail url', function() {
    let catched = false

    /**
     * index.jsの実装だとthrowされてしまい、rejectされない
     */
    return main('failfailfail').then( result => {
      assert.ok(result instanceof Array)
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