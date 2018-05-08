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
  
    main('http://www.lifehacker.jp/index.xml').then( result => {
      assert.ok(result instanceof Array)
      assert.ok(result.length > 0)
    })
  });

  it('test fail url', function() {
    let catched = false
    main('failfailfail').then( result => {
      assert.ok(result instanceof Array)
    })
    .catch( err => {
      catched = true
    })
    assert.ok(catched, 'catchされていない')
    
  });

    
});