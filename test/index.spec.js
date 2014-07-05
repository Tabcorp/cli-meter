require('should');
var Meter = require('../lib/index');

describe('Meter', function() {
  
  it('has a default length of 20', function() {
    var m = new Meter();
    m.toString().should.eql('[                    ]');
  });

  it('can specify the length', function() {
    var m = new Meter({length: 10});
    m.toString().should.eql('[          ]');
  });

  it('can display several meters at once', function(done) {

    this.slow(5000);
    this.timeout(5000);

    console.log('\n\n');

    var m1 = new Meter({total: 20, value: 5});
    var m2 = new Meter({total: 20, value: 10});
    var m3 = new Meter({total: 20, value: 15});
    
    var id = setInterval(function() {
    
      m1.step(1 - Math.random() * 2);
      m2.step(1 - Math.random() * 2);
      m3.step(1 - Math.random() * 2);
    
      process.stdout.write('\n');
      process.stdout.write('\n');
      process.stdout.write('\n');
      process.stdout.write('   Meter 1 ' + m1 + '  \n');
      process.stdout.write('   Meter 2 ' + m2 + '  \n');
      process.stdout.write('   Meter 3 ' + m3 + '  \n');
      process.stdout.write('\n');
      process.stdout.write('\n');
      process.stdout.write('\n');

    
      process.stdout.moveCursor(0, -9);
    
    }, 100);
    
    setTimeout(function() {
      clearInterval(id);
      console.log('\n\n\n\n\n\n\n\n\n');
      done();
    }, 1500);
  });

});

