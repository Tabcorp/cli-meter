
function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function repeat(str, count) {
  return Array(count + 1).join(str);
}

function Meter(opts) {
  opts = opts || {}
  this.value  = opts.value  || 0;
  this.total  = opts.total  || 100;
  this.length = opts.length || 20;
}

Meter.prototype.set = function(val) {
  this.value = clamp(val, 0, this.total);
};

Meter.prototype.step = function(delta) {
  this.value = clamp(this.value + delta, 0, this.total);
};

Meter.prototype.toString = function() {
  var percent = this.value / this.total * 100;
  var ticks   = Math.floor(percent / 100 * this.length);
  var bar     = repeat('=', ticks);
  var empty   = repeat(' ', this.length - ticks);
  return '[' + bar + empty + ']';
}

module.exports = Meter;
