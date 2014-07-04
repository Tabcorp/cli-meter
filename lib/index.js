
function Meter(opts) {
  this.value  = opts.value  || 0;
  this.total  = opts.total  || 100;
  this.length = opts.length || 20;
}

Meter.prototype.set = function(val) {
  this.value = Math.min(val, this.total);
};

Meter.prototype.step = function(delta) {
  this.value += delta;
  this.value = Math.max(this.value, 0);
  this.value = Math.min(this.value, this.total);
};

Meter.prototype.toString = function() {
  var percent = this.value / this.total * 100;
  var ticks   = Math.floor(percent / 100 * this.length);
  var bar     = Array(ticks).join('=');
  var empty   = Array(this.length - ticks).join(' ');
  return '[' + bar + empty + ']';
}

module.exports = Meter;
