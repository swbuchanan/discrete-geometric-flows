import * as utils from "./utils.js";
import { Vector } from "./utils.js";
class Vertex extends Vector {
    normal;
    constructor(x, y, normal) {
        super(x, y);
        this.normal = normal;
    }
}
class Canvas {
    canvas;
    curves;
    toggleButton;
    stepButton;
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
        // listener for single flow step button
        this.stepButton.addEventListener("click", () => {
            this.curves[0].printVertices();
            this.flowStep();
        });
    }
    constructor(canvasId) {
        console.log(`created a canvas with ID ${canvasId}`);
        this.canvas = document.getElementById(canvasId);
        // const ctx = this.canvas.getContext("2d");
        this.curves = [];
        this.toggleButton = document.getElementById("toggleAnimationButton");
        this.stepButton = document.getElementById("stepButton");
        this.animating = false;
        this.addEventListeners();
    }
    drawCurves() {
        for (const curve of this.curves) {
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
    flowStep() {
        for (const curve of this.curves) {
            curve.flowStep();
            curve.draw(this.canvas);
        }
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
    constructor() {
        console.log(`created a flow curve`);
        this.vertices = [];
    }
    clearVertices() {
        this.vertices = [];
    }
    printVertices() {
        console.log(this.vertices);
    }
    // remove a vertex and its normal vector
    removeVertex(idx) {
        this.vertices.splice(idx, 1);
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
        this.vertices.push(new Vertex(x, y, new Vector(0, 0)));
        // recalculate all the normal vectors
        if (this.vertices.length > 2) {
            for (let i = 0; i < this.vertices.length; i++) {
                this.vertices[i].normal = this.calculateNormal(i);
                continue;
            }
        }
        this.draw(canvas);
    }
    calculateNormal(idx) {
        // this is the most interesting part; choosing different definitions of the normal will give different flows
        // TODO: find out which one approximates CSF
        // currently, the normal vector is always an angle bisector with norm given by the formula for kappa below
        const speedScale = .5;
        if (this.vertices.length < 2)
            return new Vector(0, 0);
        const left_idx = (idx - 1 + this.vertices.length) % this.vertices.length;
        const right_idx = (idx + 1) % this.vertices.length;
        let differenceToLeft = new Vector(this.vertices[left_idx].x, this.vertices[left_idx].y);
        let differenceToRight = new Vector(this.vertices[right_idx].x, this.vertices[right_idx].y);
        let bisector = new Vector(0, 0);
        differenceToLeft = differenceToLeft.subtract(this.vertices[idx]).normalize();
        differenceToRight = differenceToRight.subtract(this.vertices[idx]).normalize();
        const dotProduct = Math.max(-1, Math.min(1, differenceToLeft.dot(differenceToRight)));
        // I have no idea where this formula for curvature comes from
        const kappa = Math.abs(Math.PI - Math.acos(dotProduct));
        console.log(`kappa: ${kappa}`);
        bisector = differenceToLeft.add(differenceToRight).normalize();
        //        console.log(`found a bisector with coordinates ${bisector.x}, ${bisector.y}`);
        bisector = bisector.scale(speedScale * kappa);
        console.log(`calculated a normal vector ${bisector.x, bisector.y}`);
        return bisector;
    }
    calculateNormals() {
        for (let i = 0; i < this.vertices.length; i++) {
            this.vertices[i].normal = this.calculateNormal(i);
        }
    }
    reparametrize() {
        // this is complicated
        // the idea is to redistribute the vertices along the curve in a good way
        // first idea: if any two adjacent vertices are too far apart (say distance 10), they get a new vertex added at the midpoint between them
        //    return;
        for (let i = 0; i < this.vertices.length; i++) {
            const nextIdx = (i + 1) % this.vertices.length;
            if (this.vertices[i].distanceTo(this.vertices[nextIdx]) > 10) {
                // console.log(`vertex ${i} and vertex ${nextIdx} are too darn far apart`);
                const x = (this.vertices[i].x + this.vertices[nextIdx].x) / 2;
                const y = (this.vertices[i].y + this.vertices[nextIdx].y) / 2;
                // console.log(`vertex ${i} is at position (${this.vertices[i].x}, ${this.vertices[i].y}), and vertex ${i+1} is at position (${this.vertices[nextIdx].x}, ${this.vertices[nextIdx].y}), so I'm adding a vertex at (${x}, ${y})`);
                this.vertices.splice(i + 1, 0, new Vertex(x, y, new Vector(0, 0)));
                i++;
            }
        }
    }
    draw(canvas) {
        const ctx = canvas.getContext("2d");
        ctx.strokeStyle = "black";
        ctx.lineWidth = 2;
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
        ctx.stroke();
        // draw vertices
        // this should be the color for the vertices
        ctx.fillStyle = "blue";
        for (const vertex of this.vertices) {
            // draw a vertex
            //ctx.beginPath();
            //ctx.arc(vertex.x, vertex.y, 2, 0, Math.PI * 2);
            //ctx.fill();
        }
        // this.drawNormals(canvas);
    }
    drawNormals(canvas) {
        // TODO
        const scaleFactor = 20; // for aesthetics
        const ctx = canvas.getContext("2d");
        ctx.beginPath();
        for (let i = 0; i < this.vertices.length; i++) {
            ctx.moveTo(this.vertices[i].x, this.vertices[i].y);
            ctx.lineTo(this.vertices[i].x + scaleFactor * this.vertices[i].normal.x, this.vertices[i].y + scaleFactor * this.vertices[i].normal.y);
            ctx.strokeStyle = "red";
            ctx.lineWidth = 1;
            ctx.stroke();
        }
    }
    flowStep() {
        if (this.vertices.length < 3) {
            this.clearVertices();
            return;
        }
        this.reparametrize();
        // calculate the normal vectors of all points
        this.calculateNormals();
        // first move all the points
        for (let i = 0; i < this.vertices.length; i++) {
            this.vertices[i].x = this.vertices[i].x + this.vertices[i].normal.x;
            this.vertices[i].y = this.vertices[i].y + this.vertices[i].normal.y;
        }
        // remove any adjacent points that are now on top of each other
        for (let i = 0; i < this.vertices.length; i++) {
            if (this.vertices[i].distanceTo(this.vertices[(i + 1) % this.vertices.length]) < 2) {
                this.removeVertex(i);
                //i --;
            }
        }
    }
}
document.addEventListener("DOMContentLoaded", () => {
    const canvas = new Canvas("networkFlowCanvas");
    // hi
    const canvasCurve = new FlowCurve();
    canvas.addCurve(canvasCurve);
});
