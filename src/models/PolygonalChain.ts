import * as geometry from '../utils/geometry'
import {Point, Vector} from '../utils/geometry'



  
export class PolygonalChain {
    private points: Point[];

    constructor(points: Point[]) {
        this.points = points;
    }

    public getPoints(): Point[] {
        return this.points;
    }

    public addPoint(point: Point): void {
        this.points.push(point);
    }

    public removePoint(index: number): void {
        this.points.splice(index, 1);
    }

    public getNextPoint(index: number): Point {
        if (index < this.points.length - 1) {
            return this.points[index + 1]
        } else {
            return this.points[0]
        }
    }

    public getPrevPoint(index: number): Point {
        if (index > 0) {
            return this.points[index - 1]
        } else {
            return this.points[this.points.length - 1]
        }
    }

    public getAngleAt(index: number): number {
        const prevPoint = this.points[index - 1];
        const currentPoint = this.points[index];
        const nextPoint = this.points[index + 1];

        const prevEdge: Vector = {
            x: currentPoint.x - prevPoint.x,
            y: currentPoint.y - prevPoint.y
        }

        const nextEdge: Vector = {
            x: nextPoint.x - currentPoint.x,
            y: nextPoint.y - currentPoint.y
        }

        const angle = geometry.angle(prevEdge, nextEdge);

        return angle;
    }
}