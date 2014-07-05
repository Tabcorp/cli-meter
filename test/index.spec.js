require('should');
var Meter = require('../lib/index');

describe('Meter', function() {

  describe('value', function() {

    it('can increase/decrease the value', function() {
      var m = new Meter({total: 10, value: 0});
      m.step(3);
      m.value.should.eql(3);
      m.step(-1);
      m.value.should.eql(2);
    });

    it('cannot increase/decrease the value past the bounds', function() {
      var m = new Meter({total: 10, value: 0});
      m.step(30);
      m.value.should.eql(10);
      m.step(-30);
      m.value.should.eql(0);
    });

    it('can set the value', function() {
      var m = new Meter({total: 10, value: 0});
      m.set(5);
      m.value.should.eql(5);
    });

    it('cannot set the value past the bounds', function() {
      var m = new Meter({total: 10, value: 0});
      m.set(30);
      m.value.should.eql(10);
      m.set(-30);
      m.value.should.eql(0);
    });

  });

  describe('string representation', function() {

    it('starts as a blank bar', function() {
      var m = new Meter({total: 10, value: 0, length: 10});
      m.toString().should.eql('[          ]');
    });
  
    it('can be filled to the end', function() {
      var m = new Meter({total: 10, value: 10, length: 10});
      m.toString().should.eql('[==========]');
    });

    it('can be filled proportionally', function() {
      var m = new Meter({total: 10, value: 4, length: 10});
      m.toString().should.eql('[====      ]');
    });

  });

  describe('default values', function() {

    it('has a default length of 20 characters', function() {
      var m = new Meter({});
      m.toString().should.eql('[                    ]');
    });

    it('has a default total of 100 steps', function() {
      var m = new Meter({value: 40});
      m.toString().should.eql('[========            ]');
    });

  });

  describe('animation', function() {

    this.slow(5000);
    this.timeout(5000);

    it('can animate a meter', function(done) {
      console.log('\n');
      var m = new Meter({total: 20, value: 10});
      drawLoop(2000, function() {
        m.step(2 - Math.random() * 4);
        process.stdout.write('   Meter 1 ' + m + '  \n');
        process.stdout.moveCursor(0, -1);
      }, function() {
        console.log('');
        done();
      });
    });

    it('can update several meters in a loop', function(done) {

      console.log('');
      var m1 = new Meter({total: 20, value: 5});
      var m2 = new Meter({total: 20, value: 10});
      var m3 = new Meter({total: 20, value: 15});
      
      drawLoop(2000, function() {
      
        m1.step(1 - Math.random() * 2);
        m2.step(1 - Math.random() * 2);
        m3.step(1 - Math.random() * 2);
      
        process.stdout.write('\n');
        process.stdout.write('   Meter 1 ' + m1 + '  \n');
        process.stdout.write('   Meter 2 ' + m2 + '  \n');
        process.stdout.write('   Meter 3 ' + m3 + '  \n');
        process.stdout.write('\n');
  
      
        process.stdout.moveCursor(0, -5);
      
      }, function() {
        console.log('\n\n\n');
        done();
      });

    });

  });

});


function drawLoop(duration, draw, finish) {
  var timer = setInterval(draw, 100);
  setTimeout(function() {
    clearInterval(timer);
    finish();
  }, duration);
}
