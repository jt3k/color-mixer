(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define([], factory);
  } else if (typeof exports === 'object') {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory();
  } else {
    // Browser globals (root is window)
    root.fuse = factory();
  }
}(this, function () {

  function fuse(one, two, p) {
    /**
     * Return  percentage between first and second arguments
     * @param  {String}  o  first hex value
     * @param  {String}  t  second hex-value
     * @param  {Number}  p  percentage value. Float between 0 and 1
     * @return  {String}  hex value percentage between first and second values
     */
    function fus(o, t, p) {
      if (o === t) {
        //значения равны, нечего вычислят
        return o;
      }

      o = parseInt(o, 16);
      t = parseInt(t, 16);

      var min, max, res;
      if (o < t) {
        max = t;
        min = o;
      } else {
        var invert = true;
        max = o;
        min = t;
      }


      var res = ((max - min) * p) + min;

      if (invert) {
        console.log(res);
        res = max - res;
      }
      res = Math.round(res);
      res = res.toString(16);
      return ('0' + res).slice(-2);
    }

    function stringToColorArray(color) {
      return [color.slice(0, 2), color.slice(2, 4), color.slice(4, 6)];
    }

    one = one.replace('#', '');
    two = two.replace('#', '');

    one = stringToColorArray(one);
    two = stringToColorArray(two);

    var three = '';
    one.forEach(function(el, index) {
      three += fus(one[index], two[index], p);
    });

    return three;
  }

  return fuse;
}));

//////////////////////////////////////////
/// INIT
var one = document.querySelector('.one');
var two = document.querySelector('.two');
var pzt = document.querySelector('.percentage');
var bod = document.body;

function go() {
  'use strict';
  var color = `#${fuse(one.value, two.value, pzt.value)}`;
  console.log(color);
  bod.style.background = color;
}

pzt.oninput = one.oninput = two.oninput = go;

go();