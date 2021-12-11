import { Settings } from "./types";

const defaultNumberOfShapes = 12;
const defaultShapeSize = 40;
const defaultLineWidth = 4;
const defaultPossibleColors = ['#FFF59D', '#FFAB91', '#80DEEA', '#E57373'];
const defaultFillShapes = false;
const defaultOpacity = 1;

export function getSettings(props): Settings {
	return {
		numberOfShapes: parseInt(props.get('--gpw-number-of-shapes')) || defaultNumberOfShapes,
		shapeSize: parseInt(props.get('--gpw-shape-size')) || defaultShapeSize,
		lineWidth: parseInt(props.get('--gpw-line-width')) || defaultLineWidth,
		fillShapes: (props.get('--gpw-fill-shapes').toString().trim() === 'true') || defaultFillShapes,
		opacity: parseFloat(props.get('--gpw-opacity')) || defaultOpacity,
		possibleColors: props.get('--gpw-possible-colors').length > 0
			? JSON.parse(props.get('--gpw-possible-colors'))
			: defaultPossibleColors,
	}
}
