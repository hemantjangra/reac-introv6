Array.prototype.asyncReduce = function (callback, initialValue) {
  let accumulatorValue;
  if (initialValue instanceof Promise) {
    accumulatorValue = initialValue;
  } else {
    accumulatorValue = Promise.resolve(initialValue);
  }

  for (let i = 0; i < this.length; i++) {
    accumulatorValue = Promise.all([accumulatorValue, this[i]]).then((res) => {
      return callback(res[0], res[1]);
    });
  }
  return accumulatorValue;
};
