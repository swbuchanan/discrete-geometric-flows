import * as utils from "./utils.js";
import { Vector } from "./utils.js";
class Canvas {
    canvas;
    curves;
    toggleButton;
    animating;
    animationId = null;
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
        this.animating = false;
        this.addEventListeners();
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
    animate = () => {
        for (const curve of this.curves) {
            curve.flowStep();
            curve.draw(this.canvas);
        }
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
class FlowCurve {
    vertices;
    normals;
    constructor() {
        console.log(`created a flow curve`);
        this.vertices = [];
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
        // this is the most interesting part; choosing different definitions of the normal will give different flows
        // TODO: find out which one approximates CSF
        // currently, the normal vector is always an angle bisector with norm given by the formula for kappa below
        if (this.vertices.length < 2)
            return new Vector(0, 0);
        const left_idx = (idx - 1 + this.vertices.length) % this.vertices.length;
        const right_idx = (idx + 1) % this.vertices.length;
        let differenceToLeft = new Vector(this.vertices[left_idx].x, this.vertices[left_idx].y);
        let differenceToRight = new Vector(this.vertices[right_idx].x, this.vertices[right_idx].y);
        let bisector = new Vector(0, 0);
        differenceToLeft = differenceToLeft.subtract(this.vertices[idx]).normalize();
        differenceToRight = differenceToRight.subtract(this.vertices[idx]).normalize();
        // I have no idea where this formula for curvature comes from
        const kappa = Math.abs(Math.PI - Math.acos(differenceToLeft.dot(differenceToRight)));
        bisector = differenceToLeft.add(differenceToRight).normalize();
        // I think the .5 is just to make the speed nice
        bisector = bisector.scale(.5 * kappa);
        return bisector;
        return new Vector(0, 0); // TODO
    }
    draw(canvas) {
        const ctx = canvas.getContext("2d");
        if (!ctx) {
            console.log("uh oh");
        }
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
        // first move all the points
        for (let i = 0; i < this.vertices.length; i++) {
            this.vertices[i].x = this.vertices[i].x + this.normals[i].x;
            this.vertices[i].y = this.vertices[i].y + this.normals[i].y;
        }
        // recalculate the normal vectors of all the moved points
        for (let i = 0; i < this.vertices.length; i++) {
            this.normals[i] = this.calculateNormal(i);
        }
    }
}
document.addEventListener("DOMContentLoaded", () => {
    const canvas = new Canvas("networkFlowCanvas");
    const canvasCurve = new FlowCurve();
    canvas.addCurve(canvasCurve);
});
