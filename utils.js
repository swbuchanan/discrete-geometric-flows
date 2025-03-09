export class Vector {
    x;
    y;
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    // Add another point to this point
    add(other) {
        return new Vector(this.x + other.x, this.y + other.y);
    }
    // Subtract another point from this point
    subtract(other) {
        return new Vector(this.x - other.x, this.y - other.y);
    }
    // Scale the point by a scalar
    scale(factor) {
        return new Vector(this.x * factor, this.y * factor);
    }
    // Calculate the Euclidean distance to another point
    distanceTo(other) {
        return Math.sqrt((this.x - other.x) ** 2 + (this.y - other.y) ** 2);
    }
    // Return the length of the Vector, as if it were a vector
    norm() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
    normalize() {
        return new Vector(this.x / this.norm(), this.y / this.norm());
    }
    // Convert the point to a string representation
    toString() {
        return `(${this.x}, ${this.y})`;
    }
}
export function getMousePosition(event, canvas) {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    return [x, y];
}
