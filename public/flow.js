"use strict";
// import { Visualizer } from "./graphics";
exports.__esModule = true;
// const visualizer = new Visualizer();
// visualizer.init();
// I guess this sort of thing should be moved to the graphics file??
var d3 = require("d3");
d3.select("#container")
    .transition()
    .duration(1000)
    .style("background-color", "red");
