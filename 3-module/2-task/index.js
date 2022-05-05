function filterRange(arr, a, b) {
  let res = [];

  for (let item in arr){
    if (arr[item] >= a && arr[item] <= b) res.push(arr[item]);
  }

  return res;
}
