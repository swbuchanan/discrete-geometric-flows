
export class Vector {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    // Take the dot product with another vector
    dot(other: Vector): number {
        return this.x * other.x + this.y * other.y;
    }

    // Add another point to this point
    add(other: Vector): Vector {
        return new Vector(this.x + other.x, this.y + other.y);
    }

    // Subtract another point from this point
    subtract(other: Vector): Vector {
        return new Vector(this.x - other.x, this.y - other.y);
    }

    // Scale the point by a scalar
    scale(factor: number): Vector {
        return new Vector(this.x * factor, this.y * factor);
    }

    // Calculate the Euclidean distance to another point
    distanceTo(other: Vector): number {
        return Math.sqrt((this.x - other.x) ** 2 + (this.y - other.y) ** 2);
    }

    // Return the length of the Vector, as if it were a vector
    norm(): number {
        return Math.sqrt(this.x*this.x + this.y*this.y);
    }

    normalize(): Vector {
        if (this.norm() !== 0) {
            return new Vector(this.x / this.norm(), this.y / this.norm());
        }
        return new Vector(0,0);
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
