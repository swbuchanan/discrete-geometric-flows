// import { Visualizer } from "./graphics";

// const visualizer = new Visualizer();
// visualizer.init();

// I guess this sort of thing should be moved to the graphics file??

import * as d3 from "d3"

d3.select("#container")
.transition()
.duration(1000)
.style("background-color","red")