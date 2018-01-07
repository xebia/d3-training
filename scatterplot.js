const MARGIN = { top: 20, right: 10, bottom: 40, left: 40 };

const width = 960;
const height = 500;
const areaWidth = width - MARGIN.left - MARGIN.right;
const areaHeight = height - MARGIN.top - MARGIN.bottom;

const c = d3
  .select("#container")
  .append("svg")
  .attr("width", width)
  .attr("height", height)
  .append("g")
  .attr("transform", `translate(${MARGIN.left},${MARGIN.top})`);

// Various scales. These domains make assumptions of data, naturally.
const xScale = d3.scaleLog().domain([300, 1e5]).range([0, areaWidth]);
const yScale = d3.scaleLinear().domain([10, 85]).range([areaHeight, 0]);
const radiusScale = d3.scaleSqrt().domain([0, 5e8]).range([0, 40]);
const colorScale = d3.scaleOrdinal(d3.schemeCategory10);

// Append <g> elements and render axes once
c.append("g")
  .attr("class", "x axis")
  .attr("transform", `translate(0, ${areaHeight})`)
  .call(d3.axisBottom(xScale).ticks(12, d3.format(",d")));

c.append("g").attr("class", "y axis").call(d3.axisLeft(yScale));

c.append("g").attr("class", "circles");

let i = 0;

function render(nations) {
  const update = c
    .select(".circles")
    .selectAll("circle")
    // Update
    .data(nations, (d) => d.name);

  // Enter
  update
    .enter()
    .append("circle")
    .attr("stroke", "rgba(0,0,0,0.5)")
    .attr("opacity", 0)
    .attr("cx", (d) => xScale(d.income[i]))
    .attr("cy", yScale(0))
    .attr("r", 0)
    .append("title")
    .text((d) => d.name);

  // Enter + update
  c.selectAll("circle")
    .order((a, b) => a.population - b.population)
    .transition()
    .duration(1500)
    .attr("opacity", 1)
    .attr("cx", (d) => xScale(d.income[i]))
    .attr("cy", (d) => yScale(d.lifeExpectancy[i]))
    .attr("r", (d) => radiusScale(d.population[i]))
    .style("fill", (d) => colorScale(d.region));

  update.exit().remove();
}

d3.json("nations.json").then((nations) => {
  render(nations);

  document.querySelector("button").addEventListener("click", () => {
    i = 1 - i;
    render(nations);
  });
});
