import { PossibleShape } from "./types";
import { ShapeCircle } from "./ShapeCircle";
import { ShapePolygon } from "./ShapePolygon";
import { randomIntFromInterval } from "./utils";

// @ts-ignore
registerPaint('bubblePaint', class {
	paint(ctx, geom) {
		const numberOfShapes = 20;
		const shapeSize = 40;
		const possibleShapes: PossibleShape[] = [
			PossibleShape.CIRCLE,
			PossibleShape.TRIANGLE,
			PossibleShape.SQUARE,
			PossibleShape.PENTAGON,
			PossibleShape.HEXAGON,
		];
		
		const elWidth = geom.width;
		const elHeight = geom.height;
		
		for (let i = 0; i < numberOfShapes; i ++) {
			const rotation = randomIntFromInterval(0, 360);
			const selectedShape = possibleShapes[Math.floor(Math.random() * possibleShapes.length)];
			const position = {
				x: Math.random() * elWidth,
				y: Math.random() * elHeight,
			}
			
			ctx.lineWidth = 4;
			
			ctx.strokeStyle = 'red';
			ctx.beginPath();
			
			switch (selectedShape) {
				case PossibleShape.CIRCLE:
					new ShapeCircle(ctx, shapeSize, position);
					break;
				case PossibleShape.TRIANGLE:
					new ShapePolygon(ctx, shapeSize, position, 3, -rotation);
					break;
				case PossibleShape.SQUARE:
					new ShapePolygon(ctx, shapeSize, position, 4, rotation);
					break;
				case PossibleShape.PENTAGON:
					new ShapePolygon(ctx, shapeSize, position, 5, -rotation);
					break;
				case PossibleShape.HEXAGON:
					new ShapePolygon(ctx, shapeSize, position, 6, rotation);
					break;
			}
			
			ctx.closePath();
			ctx.stroke();
		}
	}
});
