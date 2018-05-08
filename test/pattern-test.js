// require('mocha-my-color')
// var assert = require('assert');
// var main = require('../index');

// const patterns = [
//   {words:'',           src:'some foo too',      result: true  },
//   {words:'-',          src:'some foo too',      result: false },
//   {words:'some-foo',   src:'some foo too',      result: false },
//   {words:'some-foo',   src:'some-foo too',      result: true },
//   {words:'foo baa',    src:'some foo too',      result: false },
//   {words:'foo baa',    src:'some foo some baa', result: true  },
//   {words:'foo   baa',  src:'some foo some baa', result: true  },
//   {words:'foo -baa',   src:'some foo some baa', result: false },
//   {words:'foo -baa',   src:'some foo some bab', result: true  },
// ]

// describe('# multi-words-matcher', function() {
//   patterns.forEach( ptn => {
//     it(JSON.stringify(ptn), function() {
//       assert.equal(main(ptn.words, ptn.src), ptn.result);
//     });
//   })
// });
