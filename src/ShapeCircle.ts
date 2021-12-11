import { BasicShape } from "./basicShape";

/**
 * Draw a circle on the context element
 */
export class ShapeCircle extends BasicShape {
	constructor(ctx, size, position) {
		super(ctx, size, position);
		this.draw();
	}
	
	draw() {
		this.ctx.arc(
			this.position.x,
			this.position.y,
			this.size / 2,
			0,
			2 * Math.PI
		);
	}
}
