function updateInventory(arr1, arr2) {
  //create a new map
  let myMap = new Map();
  //array wich will containt all inventory
  let newInventory = [];
  //iterate through current iventory and set to map current inventory(the key is the name of the item and value is number of that item)
  for (let i = 0; i < arr1.length; i++) {
    myMap.set(arr1[i][1], arr1[i][0]);
  }
  //iterate through new delivery
  for (let i = 0; i < arr2.length; i++) {
    //if myMap dosn't have items from new delivery,set items from new delivery into map
    if (!myMap.has(arr2[i][1])) {
      myMap.set(arr2[i][1], arr2[i][0]);
      //otherwise change the number of item in the map with the number of item from new delivery
    } else {
      myMap.set(arr2[i][1], myMap.get(arr2[i][1]) + arr2[i][0]);
    }
  }
  //crate a new map with items order alphabetical from old map
  let mapSorted = new Map([...myMap.entries()].sort());
  //push to new inventory new map with the name of the item first
  for (let [key, value] of mapSorted) {
    newInventory.push([value, key]);
  }
  return newInventory;
}
console.log(updateInventory([], [
  [
    2, "Hair Pin"
  ],
  [
    3, "Half-Eaten Apple"
  ],
  [
    67, "Bowling Ball"
  ],
  [
    7, "Toothpaste"
  ]
]));
