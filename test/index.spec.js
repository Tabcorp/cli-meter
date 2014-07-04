var Meter = require('../lib/index');

describe('Meter', function() {
  
  it('Can display several meters at once', function(done) {

    this.slow(5000);
    this.timeout(5000);

    console.log('\n\n');

    var p1 = new Meter({total: 20, value: 5});
    var p2 = new Meter({total: 20, value: 10});
    var p3 = new Meter({total: 20, value: 15});
    
    var id = setInterval(function() {
    
      p1.step(1 - Math.random() * 2);
      p2.step(1 - Math.random() * 2);
      p3.step(1 - Math.random() * 2);
    
      process.stdout.write('\n');
      process.stdout.write('\n');
      process.stdout.write('\n');
      process.stdout.write('   Meter 1 ' + p1 + '  \n');
      process.stdout.write('   Meter 2 ' + p2 + '  \n');
      process.stdout.write('   Meter 3 ' + p3 + '  \n');
      process.stdout.write('\n');
      process.stdout.write('\n');
      process.stdout.write('\n');

    
      process.stdout.moveCursor(0, -9);
    
    }, 100);
    
    setTimeout(function() {
      clearInterval(id);
      console.log('\n\n\n\n\n\n\n\n\n');
      done();
    }, 2000);
  });

});

