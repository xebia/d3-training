# Three circles

Run a local server with `npx serve`. Then open `http://localhost:3000/three-circles.html` in your browser.

## 1. Draw static SVG

Draw a circle in the container.

```html
<div id="container">
  <svg width="720" height="120">
    <circle cx="40" cy="60" r="10" style="fill: steelblue;"></circle>
  </svg>
</div>
```

## 2. Rerendering using new data

Now render the same using a data driven approach and `const data = [40, 80, 120]`;

We also need to do something with _update_ and _exit_ selections.

Add a button. When clicked, all code runs again using new data: `[10, 100]`.
When clicked again the first dataset is used, etc.
To toggle between two datasets, you could use `let i = 0; i = 1 - i`;

Check: two circles will move, one circle is removed.

Make sure that you didn't append extra elements such as `svg`.

## 3. Transitions

Add transitions when attributes change. For example shrink circle before removing and move (instead of teleport) circles horizontally.

Also experiment with delays and durations.

## 4. Scales

Now we will make the other attributes from `<circle>` data driven, for example using these two datasets:

```
const datasets = [[
  { name: 'Mike', age: 20, tshirt: 'xl', bodylength: 180, gender: 'm' },
  { name: 'Frank', age: 42, tshirt: 's', bodylength: 154, gender: 'm' },
  { name: 'Eva', age: 7, tshirt: 'm', bodylength: 115, gender: 'f' }
], [
  { name: 'Frank', age: 46, tshirt: 'm', bodylength: 154, gender: 'm' },
  { name: 'Eva', age: 11, tshirt: 'xs', bodylength: 125, gender: 'f' },
  { name: 'Laura', age: 34, tshirt: 'l', bodylength: 167, gender: 'f' }
]];
```

You need scales to convert the properties from the data to attribute values.

- x-axis: age (`scaleLinear`)
- y-axis: length (`scaleLinear`)
- circle size: tshirt (`scaleOrdinal` with range [1,2,3,4,5] -> `scaleSqrt` with domain [1,5])
- circle color: gender (`scaleOrdinal`)

Check: Is there one circle removed, one added and two updated?

# Scatterplot

Create a Wealth vs. Health of Nations scatterplot using D3's [margin convention](https://bl.ocks.org/mbostock/3019563).
The data is in nations.json and can be loaded using [`d3.json`](https://github.com/d3/d3-request/blob/master/README.md#json)

It contains the name and region, population, income and life expectancy of the country. These last three properties have 2 values, for 2 different years.
First show all data using the first year. When clicking the Update button, switch to the second year using a transition.

- x-axis: income (`scaleLinear`)
- x-axis: income (`scaleLog`)
- circle size: income (`scaleSqrt`)
- circle color: region (`scaleOrdinal(d3.schemeCategory10)`)

Bonus: add axis labels and other fancy stuff as a finishing touch
