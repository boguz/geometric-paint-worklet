import { Position } from "./types";

/**
 * Basic shape class containing the properties that are common to all shape classes
 */
export class BasicShape {
	ctx: CanvasRenderingContext2D;
	size: number;
	position: Position;
	
	constructor(ctx, size, position,) {
		this.ctx = ctx;
		this.size = size;
		this.position = position;
	}
}
