import * as utils from "./utils.js";
export class Canvas {
    canvas;
    ctx;
    curves;
    toggleButton;
    clearButton;
    stepButton;
    animating;
    animationId = null;
    geometry;
    addEventListeners() {
        console.log("added click listener");
        // listener for clicking on the canvas
        this.canvas.addEventListener('mousedown', (event) => {
            const [x, y] = utils.getMousePosition(event, this.canvas);
            this.addVertex(event, this.canvas);
            this.drawCurves();
            console.log(x, y);
        });
        // listener for the toggle animation button
        this.toggleButton.addEventListener("click", () => {
            this.toggleAnimation();
        });
        // listener for single flow step button
        this.stepButton.addEventListener("click", () => {
            this.curves[0].printVertices();
            this.flowStep();
        });
        this.clearButton.addEventListener("click", () => {
            this.clearCurves();
        });
    }
    constructor(canvasId, geometry = "euclidean") {
        console.log(`created a canvas with ID ${canvasId}`);
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext("2d");
        this.curves = [];
        this.geometry = geometry;
        this.toggleButton = document.getElementById("toggleAnimationButton");
        this.stepButton = document.getElementById("stepButton");
        this.clearButton = document.getElementById("clearButton");
        this.animating = false;
        this.addEventListeners();
    }
    resizeCanvas() {
        console.log("resizing");
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        if (this.geometry == "hyperbolic") {
            console.log("clippin");
            this.clipToCircle();
        }
    }
    clipToCircle() {
        const radius = Math.min(this.canvas.width, this.canvas.height) / 2;
        this.ctx.beginPath();
        this.ctx.arc(this.canvas.width / 2, this.canvas.height / 2, radius, 0, Math.PI * 2);
        this.ctx.strokeStyle = "black";
        this.ctx.lineWidth = 1;
        this.ctx.stroke();
        this.ctx.clip();
    }
    drawBoundary() {
        if (this.geometry == "hyperbolic") {
            const radius = Math.min(this.canvas.width, this.canvas.height) / 2;
            this.ctx.beginPath();
            this.ctx.arc(this.canvas.width / 2, this.canvas.height / 2, radius, 0, Math.PI * 2);
            this.ctx.strokeStyle = "black";
            this.ctx.lineWidth = 1;
            this.ctx.stroke();
        }
    }
    drawCurves() {
        for (const curve of this.curves) {
            curve.draw(this.canvas);
        }
        this.drawBoundary();
    }
    addVertex(event, canvas) {
        // TODO: this really needs to be changed if I want to support multiple curves simultaneously (which I do)
        // maybe something like specify one curve at a time to be the active curve
        for (const curve of this.curves) {
            curve.addVertex(event, canvas);
        }
    }
    addCurve(curve) {
        this.curves.push(curve);
        console.log(`added a curve to canvas ${this.canvas.id}`);
    }
    clearCurves() {
        this.curves = [];
        if (this.animating) {
            this.toggleAnimation();
        }
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
    flowStep() {
        for (const curve of this.curves) {
            curve.flowStep();
            curve.draw(this.canvas);
        }
    }
    animate = () => {
        this.flowStep();
        this.drawBoundary();
        if (this.animating) {
            this.animationId = requestAnimationFrame(this.animate);
        }
    };
    toggleAnimation() {
        this.animating = !this.animating;
        if (this.animating) {
            this.animate();
        }
        else {
            if (this.animationId !== null) {
                cancelAnimationFrame(this.animationId);
            }
        }
    }
}
