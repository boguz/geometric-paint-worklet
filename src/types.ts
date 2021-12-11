// ENUMS
export enum PossibleShape {
	CIRCLE = 'CIRCLE',
	TRIANGLE = 'TRIANGLE',
	SQUARE = 'SQUARE',
	PENTAGON = 'PENTAGON',
	HEXAGON = 'HEXAGON'
}

// INTERFACES
export interface Position {
	x: number;
	y: number;
}

export interface Settings {
	numberOfShapes: number;
	shapeSize: number;
	lineWidth: number;
	fillShapes: boolean;
	opacity: number;
	possibleColors: string[];
}
