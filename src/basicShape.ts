import { Position } from "./types";

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
