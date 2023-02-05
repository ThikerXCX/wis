const criteriaWeights = [3, 4, 2, 5, 1];

const functionalValues = [
  [4, 5, 4, 3, 2, 5, 3],
  [2, 4, 5, 4, 4, 4, 5],
  [3, 2, 1, 2, 4, 5, 4],
  [5, 4, 3, 5, 3, 2, 4],
  [2, 3, 2, 1, 5, 4, 5],
];

console.log("Criteria Weights:");
console.log(criteriaWeights);

const sumCriteriaWeights = criteriaWeights.reduce((a, b) => a + b);
console.log("\nSum of Criteria Weights:");
console.log(sumCriteriaWeights);

const criteriaRelativeWeights = criteriaWeights.map(
  (x) => x / sumCriteriaWeights
);
console.log("\nCriteria Relative Weights:");
console.log(criteriaRelativeWeights);

console.log("\nFunctional Values:");
console.table(functionalValues);

const preferenceValues = [];
for (let i = 0; i < functionalValues[0].length; i++) {
  let preferenceValue = 0;
  for (let j = 0; j < functionalValues.length; j++) {
    preferenceValue += functionalValues[j][i] * criteriaRelativeWeights[j];
  }
  preferenceValues.push(preferenceValue);
}

console.log("\nPreference Values of Alternatives:");
console.log(preferenceValues);

const bestAlternative =
  preferenceValues.indexOf(Math.max(...preferenceValues)) + 1;

console.log("\nThe best alternative is:");
console.log("Alternative", bestAlternative);
