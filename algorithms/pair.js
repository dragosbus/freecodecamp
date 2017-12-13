function pairwise(arr, arg) {
  let sum=0;
  let checkIndex = [];
  for(let i=0;i<arr.length;i++) {
    for(let j=i+1;j<arr.length;j++) {
      if(arr[i]+arr[j] === arg && checkIndex.indexOf(i)<0 && checkIndex.indexOf(j)<0){
        checkIndex.push(i);
        checkIndex.push(j);
        sum+=i+j;
      }
    }
  }
  return sum;
}

console.log(pairwise([1, 1, 1], 2));
