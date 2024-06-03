function allocateTasks(N, tasks) {
  let P1 = [],
    P2 = [],
    P3 = [];
  let timeP1 = 0,
    timeP2 = 0,
    timeP3 = 0;

  for (let i = 0; i < N; i++) {
    if (timeP1 <= timeP2 && timeP1 <= timeP3) {
      P1.push(tasks[i]);
      timeP1 += tasks[i];
    } else if (timeP2 <= timeP1 && timeP2 <= timeP3) {
      P2.push(tasks[i]);
      timeP2 += tasks[i];
    } else {
      P3.push(tasks[i]);
      timeP3 += tasks[i];
    }
  }

  return { P1, P2, P3 };
}

let N = 100;
let tasks = Array.from(
  { length: N },
  () => Math.floor(Math.random() * 81) + 10
);
let result = allocateTasks(N, tasks);

console.log(result);
