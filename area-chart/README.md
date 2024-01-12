# D3 in React

## Exercise 1

You are going to create this area chart.

!![Examxple chart](areachart.gif)

The src folder already contains some files to get you started quickly.
The `Demo` component contains the h1, the AreaChart and the form.
The `AreaChart` component is responsible for rendering the area and axes.

### Requirements

- The chart data is of type `number[]`.
- The dimensions are 300 x 300px.
- The fill color is #9d92b2 and the line color is #6c1d5f with a stroke thickness of 3px.
- The domain of the axes automatically adjusts to the extent of the chart data.
- For every visual element, decide carefully whether React or D3 is responsible for rendering.
- Every 2000ms the data updates to a new data set with random values as configured using the 3 form fields.
- The transition from old to new area takes 1000ms.

## Exercise 2

Extract code from `AreaChart` into a new file `chartHelpers.ts`.

## Exercise 3

Create a `ScatterPlot` component that reuses as many of the chart helpers.

### Requirements

- The chart data is of type `[number,number][]` and every data point maps onto [X,Y].
- The dimensions are 300 x 300px.
- The data points are rendered as steelblue circles with opacity 0.5 and radius 4px.
- Same data generation and transitions as with the area chart.
