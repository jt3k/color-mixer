(function(root, factory) {
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
}(this, function() {
  /**
   * @param  {String}  one           first color
   * @param  {String}  two           second hex color value
   * @param  {Number}  percentage    float value of percentage
   * @return  {String}               hex color corresponds to the percentage
   *                                     ratio between the two colors
   */
  function fuse(one, two, percentage) {
    /**
     * Return delta percentage between first and second hex
     * @param  {String}  o  first hex value [00-ff]
     * @param  {String}  t  second hex-value [00-ff]
     * @param  {Number}  p  percentage value. Float between 0 and 1
     * @return {String}     hex value percentage between first and second values
     *                          if one = 100, two = 200, p = .5 
     *                          then fuse(100,200,.5); //=> 150
     */
    function fus(o, t, p) {
      if (o === t) {
        // values are equal. there is nothing to calculate
        return o;
      }
      // convert from hex
      o = parseInt(o, 16);
      t = parseInt(t, 16);

      // percentage of delta
      var res = ((t - o) * p) + o;

      // remove float point
      res = Math.round(res);
      // convert to hex
      res = res.toString(16);
      // add a leaad zero
      res = ('0' + res).slice(-2);

      return res;
    }

    function stringToColorArray(color) {
      // split string in two chars chunks 
      return color.match(/.{2}/g);
    }

    // remove hash symbol
    one = one.replace('#', '');
    two = two.replace('#', '');

    // convert to array
    one = stringToColorArray(one);
    two = stringToColorArray(two);

    // concat calculated values of each rgb component
    return one.reduce(function(memo, el, index) {
      memo += fus(one[index], two[index], percentage);
      return memo;
    }, '');
  }

  return fuse;
}));