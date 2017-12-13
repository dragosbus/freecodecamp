
function orbitalPeriod(arr) {
  var GM = 398600.4418;
  var earthRadius = 6367.4447;
  for(let i=0;i<arr.length;i++) {
    let period = Math.PI * 2 * Math.sqrt(Math.pow((earthRadius+arr[i].avgAlt),3) / GM);
    arr[i].orbitalPeriod = Math.round(period);
    delete arr[i].avgAlt;
  }
  return arr;
}

console.log(orbitalPeriod([{name: "iss", avgAlt: 413.6}, {name: "hubble", avgAlt: 556.7}, {name: "moon", avgAlt: 378632.553}]));
