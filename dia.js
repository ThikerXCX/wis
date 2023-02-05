const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});
const Chart = require("chart.js");

let criteriaWeights = [];
let functionalValues = [];

const getCriteriaWeights = () => {
  readline.question(
    "Enter the weights of 5 criteria separated by space (e.g. 3 4 2 5 1): ",
    (weightsString) => {
      criteriaWeights = weightsString.split(" ").map(Number);
      getFunctionalValues();
    }
  );
};

const getFunctionalValues = () => {
  for (let i = 0; i < 5; i++) {
    readline.question(
      `Enter the functional values of 7 alternatives for criteria ${
        i + 1
      } separated by space (e.g. 4 5 4 3 2 5 3): `,
      (functionalValuesString) => {
        functionalValues.push(functionalValues.split(" ").map(Number));
        if (functionalValues.length === 5) {
          calculate();
        }
      }
    );
  }
};

const calculate = () => {
  const sumCriteriaWeights = criteriaWeights.reduce((a, b) => a + b);
  const criteriaRelativeWeights = criteriaWeights.map(
    (x) => x / sumCriteriaWeights
  );

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

  const ctx = document.getElementById("myChart").getContext("2d");
  const chart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: [
        "Alternative 1",
        "Alternative 2",
        "Alternative 3",
        "Alternative 4",
        "Alternative 5",
        "Alternative 6",
        "Alternative 7",
      ],
      datasets: [
        {
          label: "Preference Value",
          data: preferenceValues,
          backgroundColor: "rgb(255, 99, 132)",
          borderColor: "rgb(255, 99, 132)",
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    },
  });

  readline.close();
};

getCriteriaWeights();
