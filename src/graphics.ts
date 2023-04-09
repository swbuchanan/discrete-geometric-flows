import * as d3 from 'd3';
import { PolygonalChain } from './models/PolygonalChain'

export class Visualizer {
    private polygonalChain: PolygonalChain;
    private width: number;
    private height: number;
    private svg: any;

    public init(): void{
        // set up the SVG canvas
        this.width = 600;
        this.height = 400;

        this.svg = d3.select('body')
            .append('svg')
            .attr('width', this.width)
            .attr('height', this.height)

            
        
            this.update();
    }

    private update(): void {
        // TODO: update the visualization based on the current state of the polygonal chain
    }

    // animate the polygonal chain using d3.js
    private animate(): void {
        // TODO
    }


}