module.exports = function (math, options) {
  var util = require('../../util/index'),

      Matrix = require('../../type/Matrix'),
      collection = require('../../type/collection'),

      isNumber = util.number.isNumber,
      isInteger = util.number.isInteger,
      isArray = Array.isArray;

  /**
   * Create a 2-dimensional identity matrix with size m x n or n x n
   *
   *     eye(n)
   *     eye(m, n)
   *     eye([m, n])
   *
   * TODO: more documentation on eye
   *
   * @param {...Number | Matrix | Array} size
   * @return {Matrix | Array | Number} matrix
   */
  math.eye = function eye (size) {
    var args = collection.argsToArray(arguments),
        asMatrix = (size instanceof Matrix) ? true :
        (isArray(size) ? false : (options.matrix.defaultType === 'matrix'));


    if (args.length == 0) {
      // return an empty array
      return asMatrix ? new Matrix() : [];
    }
    else if (args.length == 1) {
      // change to a 2-dimensional square
      args[1] = args[0];
    }
    else if (args.length > 2) {
      // error in case of an n-dimensional size
      throw new util.error.ArgumentsError('eye', args.length, 0, 2);
    }

    var rows = args[0],
        cols = args[1];

    if (!isNumber(rows) || !isInteger(rows) || rows < 1) {
      throw new Error('Parameters in function eye must be positive integers');
    }
    if (cols) {
      if (!isNumber(cols) || !isInteger(cols) || cols < 1) {
        throw new Error('Parameters in function eye must be positive integers');
      }
    }

    // create and args the matrix
    var matrix = new Matrix();
    var defaultValue = 0;
    matrix.resize(args, defaultValue);

    // fill in ones on the diagonal
    var minimum = math.min(args);
    var data = matrix.valueOf();
    for (var d = 0; d < minimum; d++) {
      data[d][d] = 1;
    }

    return asMatrix ? matrix : matrix.valueOf();
  };
};