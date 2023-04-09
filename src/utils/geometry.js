"use strict";
exports.__esModule = true;
function dotProduct(u, v) {
    return u.x * v.x + u.y + v.y;
}
exports.dotProduct = dotProduct;
function magnitude(u) {
    return Math.sqrt(dotProduct(u, u));
}
exports.magnitude = magnitude;
function angle(u, v) {
    return Math.acos(dotProduct(u, v) / (magnitude(u) * magnitude(v)));
}
exports.angle = angle;
