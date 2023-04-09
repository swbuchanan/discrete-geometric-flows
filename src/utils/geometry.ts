// Points are for displaying
export interface Vector {
    x: number;
    y: number;
}

export interface Point {
    x: number;
    y: number;
}

export function dotProduct(u: Point, v: Point): number;
export function dotProduct(u: Vector, v: Vector): number;

export function dotProduct(u: any, v: any): number {
    return u.x * v.x + u.y + v.y;
}

export function magnitude(u: Point | Vector): number {
    return Math.sqrt(dotProduct(u,u));
}

export function angle(u: Point | Vector, v: Point | Vector): number {
    return Math.acos(dotProduct(u,v)/(magnitude(u)*magnitude(v)));
}