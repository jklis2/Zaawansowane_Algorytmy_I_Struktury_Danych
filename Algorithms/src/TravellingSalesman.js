function travelingSalesman(matrix) {
  function calculatePathCost(matrix, path) {
    let cost = 0;
    for (let i = 0; i < path.length - 1; i++) {
      cost += matrix[path[i]][path[i + 1]];
    }
    cost += matrix[path[path.length - 1]][path[0]];
    return cost;
  }

  function swap(arr, i, j) {
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }

  function* permute(arr, n) {
    n = n || arr.length;
    if (n === 1) {
      yield arr.slice();
    } else {
      for (let i = 0; i < n - 1; i++) {
        yield* permute(arr, n - 1);
        swap(arr, n % 2 ? 0 : i, n - 1);
      }
      yield* permute(arr, n - 1);
    }
  }

  let cities = [...Array(matrix.length).keys()];
  let minPath = cities.slice();
  let minCost = calculatePathCost(matrix, cities);

  for (let perm of permute(cities)) {
    let currentCost = calculatePathCost(matrix, perm);
    if (currentCost < minCost) {
      minCost = currentCost;
      minPath = perm.slice();
    }
  }

  return { path: minPath, cost: minCost };
}

// Example:
const matrix = [
  [0, 22, 41, 82, 58, 49],
  [22, 0, 14, 42, 78, 97],
  [41, 14, 0, 63, 49, 59],
  [82, 42, 63, 0, 36, 73],
  [58, 78, 49, 36, 0, 67],
  [49, 97, 59, 73, 67, 0],
];

const result = travelingSalesman(matrix);
console.log(result);
