import * as utils from "./utils.js";
import { Vector } from "./utils.js";
class Canvas {
    canvas;
    curves;
    toggleButton;
    addEventListeners() {
        console.log("added click listener");
        // listener for clicking on the canvas
        this.canvas.addEventListener('mousedown', (event) => {
            const [x, y] = utils.getMousePosition(event, this.canvas);
            this.addVertex(event, this.canvas);
            this.drawCurves();
            console.log(x, y);
        });
        // can I do this?
        //        this.canvas.addEventListener("click", this.addVertex.bind(this));
        // listener for the toggle animation button
        this.toggleButton.addEventListener("click", () => {
            this.toggleAnimation();
        });
    }
    constructor(canvasId) {
        console.log(`created a canvas with ID ${canvasId}`);
        this.canvas = document.getElementById(canvasId);
        // const ctx = this.canvas.getContext("2d");
        this.curves = [];
        this.toggleButton = document.getElementById("toggleAnimationButton");
        this.addEventListeners();
    }
    toggleAnimation() {
        return; // TODO
    }
    drawCurves() {
        for (const curve of this.curves) {
            console.log("draw");
            curve.draw(this.canvas);
        }
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
}
class FlowCurve {
    vertices;
    normals;
    constructor() {
        console.log(`created a flow curve`);
        this.vertices = [new Vector(10, 10)];
        this.normals = [];
    }
    clearVertices() {
        this.vertices = [];
        this.normals = [];
    }
    // add a point at the position of the cursor
    addVertex(event, canvas) {
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        // don't add the same point twice
        if (this.vertices.length > 1 && this.vertices[this.vertices.length - 1].x == x && this.vertices[this.vertices.length - 1].y == y) {
            return;
        }
        // add the point and a normal vector (0 for now)
        this.vertices.push(new Vector(x, y));
        this.normals.push(new Vector(0, 0));
        // recalculate all the normal vectors
        if (this.vertices.length > 2) {
            for (let i = 0; i < this.vertices.length; i++) {
                this.normals[i] = this.calculateNormal(i);
                continue;
            }
        }
        this.draw(canvas);
        this.drawNormals(canvas);
    }
    calculateNormal(idx) {
        return new Vector(0, 0); // TODO
    }
    draw(canvas) {
        const ctx = canvas.getContext("2d");
        if (!ctx) {
            console.log("uh oh");
        }
        console.log("okay");
        if (this.vertices.length < 1)
            return;
        // clear the canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // draw the curve
        ctx.beginPath();
        ctx.moveTo(this.vertices[0].x, this.vertices[0].y);
        for (let i = 1; i < this.vertices.length; i++) {
            ctx.lineTo(this.vertices[i].x, this.vertices[i].y);
        }
        ctx.lineTo(this.vertices[0].x, this.vertices[0].y);
        // style the stroke
        ctx.strokeStyle = "black";
        ctx.lineWidth = 2;
        ctx.stroke();
    }
    drawNormals(canvas) {
        // TODO
        return;
    }
    flowStep() {
        if (this.vertices.length < 3) {
            this.clearVertices();
            return;
        }
    }
}
document.addEventListener("DOMContentLoaded", () => {
    console.log("flow time baby");
    const canvas = new Canvas("networkFlowCanvas");
    const canvasCurve = new FlowCurve();
    canvas.addCurve(canvasCurve);
});
