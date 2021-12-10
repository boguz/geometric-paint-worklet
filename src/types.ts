// ENUMS
export enum PossibleShape {
	CIRCLE = 'CIRCLE',
	TRIANGLE = 'TRIANGLE',
	SQUARE = 'SQUARE',
	PENTAGON = 'PENTAGON',
	HEXAGON = 'HEXAGON'
}

export interface Position {
	x: number;
	y: number;
}

interface Point {
	x: number,
	y: number
}

export interface TrianglePoints {
	p1: Point,
	p2: Point,
	p3: Point,
}
