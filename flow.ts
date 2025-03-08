import * as utils from "./utils.js";
import { Point } from "./utils.js";

class CanvasCurve {
    private vertices: Point[];
    private canvas: HTMLCanvasElement;
    // private context: CanvasRenderingContext2D;

    addEventListeners() {
        console.log("added click listener");
        this.canvas.addEventListener('mousedown', (event: MouseEvent) => {
            const [x,y] = utils.getMousePosition(event, this.canvas);
            console.log(x,y);
        });
    }

    constructor(canvasId: string) {
        console.log(`created a canvas with ID ${canvasId}`);
        this.canvas = document.getElementById(canvasId) as HTMLCanvasElement;
        const ctx = this.canvas.getContext("2d");
        this.vertices = [new Point(10,10)];
        this.addEventListeners();
    }

}

document.addEventListener("DOMContentLoaded", () => {
    console.log("flow time baby");
    const canvasCurve = new CanvasCurve("networkFlowCanvas");
});
