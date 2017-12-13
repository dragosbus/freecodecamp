function sym(args) {
  return [...arguments].reduce((arr1, arr2) => {
    let result = [];
    arr1.forEach(element => {
      if (!arr2.includes(element) && !result.includes(element)) {
        result.push(element);
      }
    }); //end first forEache
    arr2.forEach(element => {
      if (!arr1.includes(element) && !result.includes(element)) {
        result.push(element);
      }
    }); //nd second foreach
    return result;
  }); //end reduce
}

sym([1, 2, 3], [5, 2, 1, 4]);