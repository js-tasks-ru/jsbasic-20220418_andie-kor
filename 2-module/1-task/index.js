function sumSalary(salaries) {
  let sum = 0;
  for (let key in salaries) {
    let currentVal = salaries[key];
    if (typeof currentVal == 'number'){
      if (currentVal != currentVal || Math.abs(currentVal) == Infinity) continue;
      sum += currentVal;
    }
  }
  return sum;
}