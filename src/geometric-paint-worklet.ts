import { PossibleShape } from "./types";
import { ShapeCircle } from "./ShapeCircle";
import { ShapePolygon } from "./ShapePolygon";
import { getRandomItemFromArray, randomIntFromInterval } from "./utils";
import { getSettings } from "./settings";

// @ts-ignore
registerPaint('geometricPaintWorklet', class {
	static get inputProperties() {
		return [
			'--gpw-number-of-shapes',
			'--gpw-shape-size',
			'--gpw-line-width',
			'--gpw-possible-colors',
			'--gpw-fill-shapes',
			'--gpw-opacity',
		];
	}
	
	paint(ctx, geom, props) {
		const elWidth = geom.width;
		const elHeight = geom.height;
		const settings = getSettings(props);
		const possibleShapes: PossibleShape[] = [
			PossibleShape.CIRCLE,
			PossibleShape.TRIANGLE,
			PossibleShape.SQUARE,
			PossibleShape.PENTAGON,
			PossibleShape.HEXAGON,
		];
		
		ctx.globalAlpha = settings.opacity;
		
		for (let i = 0; i < settings.numberOfShapes; i ++) {
			const rotation = randomIntFromInterval(0, 360);
			const selectedShape = getRandomItemFromArray(possibleShapes);
			const position = {
				x: randomIntFromInterval(0, elWidth),
				y: randomIntFromInterval(0, elHeight),
			}
			
			const selectedColor = getRandomItemFromArray(settings.possibleColors);
			ctx.lineWidth = settings.lineWidth;
			ctx.strokeStyle = selectedColor;
			if (settings.fillShapes) {
				ctx.fillStyle = selectedColor;
			}
			ctx.beginPath();
			
			switch (selectedShape) {
				case PossibleShape.CIRCLE:
					new ShapeCircle(ctx, settings.shapeSize, position);
					break;
				case PossibleShape.TRIANGLE:
					new ShapePolygon(ctx, settings.shapeSize, position, 3, -rotation);
					break;
				case PossibleShape.SQUARE:
					new ShapePolygon(ctx, settings.shapeSize, position, 4, rotation);
					break;
				case PossibleShape.PENTAGON:
					new ShapePolygon(ctx, settings.shapeSize, position, 5, -rotation);
					break;
				case PossibleShape.HEXAGON:
					new ShapePolygon(ctx, settings.shapeSize, position, 6, rotation);
					break;
			}
			
			ctx.closePath();
			ctx.stroke();
			if (settings.fillShapes) {
				ctx.fill();
			}
		}
	}
});
