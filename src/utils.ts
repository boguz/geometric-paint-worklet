/**
 * Return a number between two integers, min and max included
 *
 * @param min
 * @param max
 */
export function randomIntFromInterval(min: number, max: number): number {
	return Math.floor(Math.random() * (max - min + 1) + min)
}
