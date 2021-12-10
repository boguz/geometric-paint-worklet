import { PossibleShape } from "./types";
import { ShapeCircle } from "./ShapeCircle";
import { ShapePolygon } from "./ShapePolygon";
import { randomIntFromInterval } from "./utils";

// @ts-ignore
registerPaint('bubblePaint', class {
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
		const numberOfShapes = parseInt(props.get('--gpw-number-of-shapes')) || 12;
		const shapeSize = parseInt(props.get('--gpw-shape-size')) || 40;
		const lineWidth = parseInt(props.get('--gpw-line-width')) || 4;
		const defaultPossibleColors = ['#FFF59D', '#FFAB91', '#80DEEA', '#E57373'];
		const fillShapes: boolean = (props.get('--gpw-fill-shapes').toString().trim() === 'true') || false;
		const opacity = parseFloat(props.get('--gpw-opacity')) || 1;
		const possibleColors = props.get('--gpw-possible-colors').length > 0
			? JSON.parse(props.get('--gpw-possible-colors'))
			: defaultPossibleColors;
		const possibleShapes: PossibleShape[] = [
			PossibleShape.CIRCLE,
			PossibleShape.TRIANGLE,
			PossibleShape.SQUARE,
			PossibleShape.PENTAGON,
			PossibleShape.HEXAGON,
		];
		
		const elWidth = geom.width;
		const elHeight = geom.height;
		
		ctx.globalAlpha = opacity;
		
		for (let i = 0; i < numberOfShapes; i ++) {
			const rotation = randomIntFromInterval(0, 360);
			const selectedShape = possibleShapes[Math.floor(Math.random() * possibleShapes.length)];
			const position = {
				x: Math.random() * elWidth,
				y: Math.random() * elHeight,
			}
			
			const selectedColor = possibleColors[Math.floor(Math.random() * possibleColors.length)];
			ctx.lineWidth = lineWidth;
			ctx.strokeStyle = selectedColor;
			if (fillShapes) {
				ctx.fillStyle = selectedColor;
			}
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
			if (fillShapes) {
				ctx.fill();
			}
		}
	}
});
