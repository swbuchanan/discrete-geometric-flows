import * as utils from "./utils.js";
import { Vector } from "./utils.js";
import { Canvas } from "./canvas.js";
import { FlowCurve } from "./curve.js";


document.addEventListener("DOMContentLoaded", () => {
    const canvas = new Canvas("networkFlowCanvas", "hyperbolic");
    window.addEventListener("resize", canvas.resizeCanvas);
    canvas.resizeCanvas();
    // hi
    const canvasCurve = new FlowCurve();
    canvas.addCurve(canvasCurve);
});
