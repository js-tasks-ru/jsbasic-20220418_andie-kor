function camelize(str) {
  let arr = str.split('');
  
  arr.forEach((elem, index) =>{
    if (elem === '-'){
      arr.splice(index, 1);
      arr[index] = arr[index].toUpperCase();
    }
  });

  return arr.join('');
}

camelize('-background-color-li');