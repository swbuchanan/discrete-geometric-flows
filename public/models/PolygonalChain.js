"use strict";
exports.__esModule = true;
var geometry = require("../../src/utils/geometry");
var PolygonalChain = /** @class */ (function () {
    function PolygonalChain(points) {
        this.points = points;
    }
    PolygonalChain.prototype.getPoints = function () {
        return this.points;
    };
    PolygonalChain.prototype.addPoint = function (point) {
        this.points.push(point);
    };
    PolygonalChain.prototype.removePoint = function (index) {
        this.points.splice(index, 1);
    };
    PolygonalChain.prototype.getNextPoint = function (index) {
        if (index < this.points.length - 1) {
            return this.points[index + 1];
        }
        else {
            return this.points[0];
        }
    };
    PolygonalChain.prototype.getPrevPoint = function (index) {
        if (index > 0) {
            return this.points[index - 1];
        }
        else {
            return this.points[this.points.length - 1];
        }
    };
    PolygonalChain.prototype.getAngleAt = function (index) {
        var prevPoint = this.points[index - 1];
        var currentPoint = this.points[index];
        var nextPoint = this.points[index + 1];
        var prevEdge = {
            x: currentPoint.x - prevPoint.x,
            y: currentPoint.y - prevPoint.y
        };
        var nextEdge = {
            x: nextPoint.x - currentPoint.x,
            y: nextPoint.y - currentPoint.y
        };
        var angle = geometry.angle(prevEdge, nextEdge);
        return angle;
    };
    return PolygonalChain;
}());
exports.PolygonalChain = PolygonalChain;
