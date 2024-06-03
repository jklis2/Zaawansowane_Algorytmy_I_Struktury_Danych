function knapsack(items, capacity) {
  let n = items.length;
  let dp = Array(n + 1)
    .fill(null)
    .map(() => Array(capacity + 1).fill(0));

  for (let i = 1; i <= n; i++) {
    let { weight, value } = items[i - 1];
    for (let w = 0; w <= capacity; w++) {
      if (weight <= w) {
        dp[i][w] = Math.max(dp[i - 1][w], dp[i - 1][w - weight] + value);
      } else {
        dp[i][w] = dp[i - 1][w];
      }
    }
  }

  let bestValue = dp[n][capacity];
  let bestCombination = [];
  for (let i = n, w = capacity; i > 0 && bestValue > 0; i--) {
    if (bestValue != dp[i - 1][w]) {
      bestCombination[i - 1] = 1;
      bestValue -= items[i - 1].value;
      w -= items[i - 1].weight;
    } else {
      bestCombination[i - 1] = 0;
    }
  }

  return bestCombination;
}

// Example:
let items = [];
for (let i = 0; i < 100; i++) {
  items.push({
    weight: Math.floor(Math.random() * 81) + 10,
    value: Math.floor(Math.random() * 81) + 10,
  });
}
let capacity = 2500;
let bestCombination = knapsack(items, capacity);
console.log("Best combination:", bestCombination);
console.log(
  "Total value:",
  bestCombination.reduce(function (sum, val, idx) {
    return sum + (val ? items[idx].value : 0);
  }, 0)
);
console.log(
  "Total weight:",
  bestCombination.reduce(function (sum, val, idx) {
    return sum + (val ? items[idx].weight : 0);
  }, 0)
);
