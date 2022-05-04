function getMinMax(str) {
  let arr = str.split(' ');
  let arrOfNumbers = [];

  for (let item of arr){
    if (!isNaN(+item)) arrOfNumbers.push(+item);
  }
  
  return result = {
    min: Math.min(...arrOfNumbers),
    max: Math.max(...arrOfNumbers),
  };
}