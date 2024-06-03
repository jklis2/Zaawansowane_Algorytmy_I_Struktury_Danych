class Individual {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.fitness = this.calculateFitness();
  }

  calculateFitness() {
    let x = this.x;
    let y = this.y;
    return Math.abs(
      Math.sin(x) +
        Math.sin(2 * x) +
        Math.sin(3 * x) +
        Math.sin(4 * x) +
        Math.cos(x) +
        Math.cos(2 * x) +
        Math.cos(3 * x) +
        Math.cos(4 * x)
    );
  }
}

function generateInitialPopulation(size) {
  const population = [];
  for (let i = 0; i < size; i++) {
    let x = Math.random() * (2 * Math.PI);
    let y = Math.random() * (2 * Math.PI);
    population.push(new Individual(x, y));
  }
  return population;
}

function selectParents(population) {
  const selected = [];
  for (let i = 0; i < population.length / 2; i++) {
    const parentA = population[Math.floor(Math.random() * population.length)];
    const parentB = population[Math.floor(Math.random() * population.length)];
    selected.push([parentA, parentB]);
  }
  return selected;
}

function crossover(parentA, parentB) {
  const child1 = new Individual(parentA.x, parentB.y);
  const child2 = new Individual(parentB.x, parentA.y);
  return [child1, child2];
}

function mutate(individual, mutationRate) {
  if (Math.random() < mutationRate) {
    individual.x += Math.random() < 0.5 ? -0.000001 : 0.000001;
    individual.x = Math.max(0, Math.min(individual.x, 2 * Math.PI));
  }
  if (Math.random() < mutationRate) {
    individual.y += Math.random() < 0.5 ? -0.000001 : 0.000001;
    individual.y = Math.max(0, Math.min(individual.y, 2 * Math.PI));
  }
  individual.fitness = individual.calculateFitness();
}

function geneticAlgorithm(populationSize, generations, mutationRate) {
  let population = generateInitialPopulation(populationSize);

  for (let generation = 0; generation < generations; generation++) {
    const parents = selectParents(population);
    const offspring = [];

    parents.forEach(([parentA, parentB]) => {
      const [child1, child2] = crossover(parentA, parentB);
      offspring.push(child1, child2);
    });

    offspring.forEach((child) => mutate(child, mutationRate));
    population = population
      .concat(offspring)
      .sort((a, b) => b.fitness - a.fitness)
      .slice(0, populationSize);
  }

  return population[0];
}

// Example:
const bestIndividual = geneticAlgorithm(100, 200, 0.1);
console.log(
  `Best individual: x=${bestIndividual.x}, y=${bestIndividual.y}, fitness=${bestIndividual.fitness}`
);
