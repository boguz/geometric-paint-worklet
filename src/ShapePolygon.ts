import { BasicShape } from "./basicShape";

/**
 * Draw a polygon on the context,
 * The number of sides for the polygon are passes via 'sideCount' parameter.
 */
export class ShapePolygon extends BasicShape {
	rotation: number;
	radians: number;
	sidesCount: number;
	
	constructor(ctx, size, position, sidesCount = 3, rotation = 0) {
		super(ctx, size, position);
		this.rotation = rotation;
		this.radians = this.rotation * Math.PI / 180;
		this.sidesCount = sidesCount;
		
		this.draw();
	}
	
	draw() {
		this.ctx.translate(this.position.x, this.position.y);
		this.ctx.rotate(this.radians);
		this.ctx.beginPath();
		this.ctx.moveTo(
			this.size / 2 * Math.cos(0),
			this.size / 2 * Math.sin(0)
		);
		for (let i = 0; i < this.sidesCount; i ++) {
			this.ctx.lineTo(
				this.size / 2 * Math.cos(i * 2 * Math.PI / this.sidesCount),
				this.size / 2 * Math.sin(i * 2 * Math.PI / this.sidesCount)
			);
		}
		this.ctx.closePath();
	
		this.ctx.rotate(-this.radians);
		this.ctx.translate(-this.position.x, -this.position.y);
	}
}
