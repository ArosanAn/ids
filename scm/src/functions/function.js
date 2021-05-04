export const entropy = (x) => {
  const l = x.reduce((acc, cur) => acc+parseFloat(cur), 0.0);
  if (x.includes("0") || x.includes(0)) {
    return 0;
  }
  return -x.reduce((acc, cur) => {
    return acc + (parseFloat(cur)/l)*Math.log2((parseFloat(cur)/l))
  }, 0);
};

export const gini = (x) => {
  const l = x.reduce((acc, cur) => acc+parseFloat(cur), 0.0);

  return 1 - x.reduce((acc, cur) => {
    return acc + Math.pow((parseFloat(cur)/l), 2)
  }, 0);
};

export const measSquaredError = (tar, pred) => {
  const res = tar.reduce((acc, cur, idx) => {
    return acc + Math.pow((parseFloat(cur) - parseFloat(pred[idx])), 2)
  }, 0);
  const result = res/ 2;
  console.log(res, result);
  return result;
};

export const mean = (x) => {
  const res =  x.reduce((acc, cur) => acc+parseFloat(cur), 0);
  return res/x.length;
};

export const variance = (x, mean) => {
  const l = (x.length - 1);

  const res = x.reduce((acc, cur) => {
    return acc + Math.pow((parseFloat(cur)-mean), 2);
  }, 0);
  const result = (res/l);
  return result;
};

export function mwd1(w0, w1, d) {
  return d.map(value => (parseFloat(w0) + parseFloat(w1)*parseFloat(value)).toFixed(2));
}

export function mwd2(w0, w1, w2, d1, d2) {
  return d1.map((value, idx) => (parseFloat(w0) + parseFloat(w1)*parseFloat(value) + parseFloat(w2)*parseFloat(d2[idx])).toFixed(2));
}
export function mwd3(w0, w1, w2, w3, d1, d2, d3) {
  return d1.map((value, idx) =>
    (parseFloat(w0) +
      parseFloat(w1)*parseFloat(value) +
      parseFloat(w2)*parseFloat(d2[idx]) +
      parseFloat(w3)*parseFloat(d3[idx])
    ).toFixed(2)
  );
}