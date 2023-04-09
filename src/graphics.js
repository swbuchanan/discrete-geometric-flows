"use strict";
exports.__esModule = true;
var d3 = require("d3");
var Visualizer = /** @class */ (function () {
    function Visualizer() {
    }
    Visualizer.prototype.init = function () {
        // set up the SVG canvas
        this.width = 600;
        this.height = 400;
        this.svg = d3.select('body')
            .append('svg')
            .attr('width', this.width)
            .attr('height', this.height);
        this.update();
    };
    Visualizer.prototype.update = function () {
        // TODO: update the visualization based on the current state of the polygonal chain
    };
    // animate the polygonal chain using d3.js
    Visualizer.prototype.animate = function () {
        // TODO
    };
    return Visualizer;
}());
exports.Visualizer = Visualizer;
