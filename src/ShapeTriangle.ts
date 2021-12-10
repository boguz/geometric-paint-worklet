import { BasicShape } from "./basicShape";
import { TrianglePoints } from "./types";

export class ShapeTriangle extends BasicShape {
	radius: number;
	trianglePoints: TrianglePoints;
	
	constructor(ctx, size, position) {
		super(ctx, size, position);
		this.radius = (this.size / 2) / Math.cos(Math.PI/6);
		this.trianglePoints = {
			p1: {
				x: this.position.x + this.radius,
				y: this.position.y,
			},
			p2: {
				x: this.position.x + this.radius * Math.cos(2 * Math.PI/3),
				y: this.position.y + this.radius * Math.sin(2 * Math.PI/3),
			},
			p3: {
				x: this.position.x + this.radius * Math.cos(4 * Math.PI/3),
				y: this.position.y + this.radius * Math.sin(4 * Math.PI/3)
			}
		}
		this.draw();
	}
	
	draw() {
		this.ctx.strokeStyle = "purple";
		
		this.ctx.beginPath();
		this.ctx.moveTo(this.trianglePoints.p1.x, this.trianglePoints.p1.y);
		this.ctx.lineTo(this.trianglePoints.p2.x, this.trianglePoints.p2.y);
		this.ctx.lineTo(this.trianglePoints.p3.x, this.trianglePoints.p3.y);
		this.ctx.lineTo(this.trianglePoints.p1.x, this.trianglePoints.p1.y);
		this.ctx.closePath();
		this.ctx.stroke();
	}
}
