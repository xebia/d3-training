const datasets = [
  [
    { name: "Mike", age: 20, tshirt: "xl", bodylength: 180, gender: "m" },
    { name: "Frank", age: 42, tshirt: "s", bodylength: 154, gender: "m" },
    { name: "Eva", age: 7, tshirt: "m", bodylength: 115, gender: "f" },
  ],
  [
    { name: "Frank", age: 46, tshirt: "m", bodylength: 154, gender: "m" },
    { name: "Eva", age: 11, tshirt: "xs", bodylength: 125, gender: "f" },
    { name: "Laura", age: 34, tshirt: "l", bodylength: 167, gender: "f" },
  ],
];

// Add SVG
const svg = d3
  .select("#container")
  .append("svg")
  .attr("width", 720)
  .attr("height", 120);

// Scales
const xScale = d3.scaleLinear([0, 100], [0, 720]);
const yScale = d3.scaleLinear([0, 200], [80, 20]);
const tshirtScale = d3.scaleOrdinal(
  ["xs", "s", "m", "l", "xl"],
  [1, 2, 3, 4, 5]
);
const radiusScale = d3.scaleSqrt([1, 5], [5, 20]);
const colorScale = d3.scaleOrdinal(["m", "f"], d3.schemePastel1);

function render(data) {
  const update = svg
    .selectAll("circle")
    // Update
    .data(data, (d) => d.name);

  // Exit
  update.exit().transition().duration(1500).attr("r", 0).remove();

  // Enter
  update
    .enter()
    .append("circle")
    .attr("r", 0)
    .style("fill", "white")
    // Enter+update
    .merge(update)
    .transition()
    .duration(1500)
    .attr("r", (d) => radiusScale(tshirtScale(d.tshirt)))
    .attr("cy", (d) => yScale(d.bodylength))
    .attr("cx", (d) => xScale(d.age))
    .style("fill", (d) => colorScale(d.gender));
}

let i = 0;
render(datasets[i]);

document.querySelector("button").addEventListener("click", function () {
  // Switch datasets
  i = 1 - i;

  render(datasets[i]);
});
