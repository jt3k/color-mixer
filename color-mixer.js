const rgbToArray = color => [color.slice(0, 2), color.slice(2, 4), color.slice(4, 6)];

/**
 * Return delta percentage between first and second hex
 * @param  {String}  one        First hex color
 * @param  {String}  two        Second hex-color
 * @param  {Number}  percentage Float between 0 and 1
 * @return {String}             Hex color.
 */

export default (_one, _two, percentage) => {
  // convert to array
  one = rgbToArray(_one);
  two = rgbToArray(_two);

  // concat calculated values of each rgb component
  return one.reduce((memo, el, index) => {
    let mixedColor;
    if (one[index] === two[index]) {
      mixedColor = one[index];
    } else {
      const oneColorComponent = parseInt(one[index], 16);
      const twoColorComponent = parseInt(two[index], 16);

      // Calculate delta between first and second hex
      // hex value percentage between first and second values
      // if one = ff, two = 00, percentage = .5
      // then mixedColor = 80
      mixedColor =
        (twoColorComponent - oneColorComponent) * percentage +
        oneColorComponent;

      // remove float point
      mixedColor = Math.round(mixedColor);
      mixedColor = mixedColor.toString(16);
      mixedColor = ("0" + mixedColor).slice(-2);
    }

    memo += mixedColor;
    return memo;
  }, "");
};
