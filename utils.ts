
export class Point {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    // Add another point to this point
    add(other: Point): Point {
        return new Point(this.x + other.x, this.y + other.y);
    }

    // Subtract another point from this point
    subtract(other: Point): Point {
        return new Point(this.x - other.x, this.y - other.y);
    }

    // Scale the point by a scalar
    scale(factor: number): Point {
        return new Point(this.x * factor, this.y * factor);
    }

    // Calculate the Euclidean distance to another point
    distanceTo(other: Point): number {
        return Math.sqrt((this.x - other.x) ** 2 + (this.y - other.y) ** 2);
    }

    // Return the length of the Point, as if it were a vector
    norm(): number {
        return Math.sqrt(this.x*this.x + this.y*this.y);
    }

    normalize(): Point {
        return new Point(this.x / this.norm(), this.y / this.norm());
    }

    // Convert the point to a string representation
    toString(): string {
        return `(${this.x}, ${this.y})`;
    }
}

export function getMousePosition(event: MouseEvent, canvas: HTMLCanvasElement): [number, number] {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    return [x,y];
}
