function checkCashRegister(price, cash, cid) {
  var nOfCoins = new Map();
  var change = [];
  var diff = Math.round((cash - price) * 100);
  var coins = [
    1,
    5,
    10,
    25,
    100,
    500,
    1000,
    2000,
    10000
  ];
  var totalMoney = 0;
  for (let i = 0; i < cid.length; i++) {
    totalMoney += cid[i][1];
  }
  if (totalMoney < diff / 100) {
    return "Insufficient Funds";
  } else if (totalMoney === diff) {
    return 'Closed';
  } else {
    for (let i = coins.length - 1; i >= 0; i--) {
      if (diff >= coins[i] && cid[i][1]>0) {
        diff -= coins[i];
        change.push(coins[i]);
        if (cid[i][1] <= coins[i]) {
          continue;
        } else {
          i = coins.length - 1;
        }
      }
    }
    for (let i = 0; i < change.length; i++) {
      if (!nOfCoins.has(change[i])) {
        nOfCoins.set(change[i], 1);
      } else {
        nOfCoins.set(change[i], nOfCoins.get(change[i]) + 1);
      }
    }
    var myCoins = Array.from(nOfCoins);

    for (let i = 0; i < myCoins.length; i++) {
      if (myCoins[i][0] === 1) {
        myCoins[i].unshift('PENNY');
      } else if (myCoins[i][0] === 5) {
        myCoins[i].unshift('NICKEL');
      } else if (myCoins[i][0] === 10) {
        myCoins[i].unshift('DIME');
      } else if (myCoins[i][0] === 25) {
        myCoins[i].unshift('QUARTER');
      } else if (myCoins[i][0] === 100) {
        myCoins[i].unshift('ONE');
      } else if (myCoins[i][0] === 500) {
        myCoins[i].unshift('FIVE');
      } else if (myCoins[i][0] === 1000) {
        myCoins[i].unshift('TEN');
      } else if (myCoins[i][0] === 2000) {
        myCoins[i].unshift('TWENTY');
      } else if (myCoins[i][0] === 10000) {
        myCoins[i].unshift('ONE HUNDRED');
      }
      myCoins[i][1] /= 100;
    }
    for (let i = 0; i < cid.length; i++) {
      for (let j = 0; j < myCoins.length; j++) {
        if (cid[i][0] === myCoins[j][0]) {
          cid[i][1] -= (myCoins[j][1] * myCoins[j][2]);
        }
      }
    }
  }
  for (let i = 0; i < cid.length; i++) {
    cid[i][1] = Math.round(cid[i][1] * 100) / 100;
  }
  return cid;
}

console.log(checkCashRegister(19.50, 20.00, [
  [
    "PENNY", 0.01
  ],
  [
    "NICKEL", 0
  ],
  [
    "DIME", 0
  ],
  [
    "QUARTER", 0
  ],
  [
    "ONE", 1.00
  ],
  [
    "FIVE", 0
  ],
  [
    "TEN", 0
  ],
  [
    "TWENTY", 0
  ],
  [
    "ONE HUNDRED", 0
  ]
]))
