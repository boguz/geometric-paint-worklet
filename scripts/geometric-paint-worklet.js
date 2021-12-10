registerPaint('bubblePaint', class {
  paint(ctx, geom) {
    const numberOfShapes = 10;
    const possibleShapes = ['triangle', 'square', 'circle'];
    const shapeSize = 20;

    const bodyWidth = geom.width;
    const bodyHeight = geom.height;

    for (let i = 0; i < numberOfShapes; i ++) {
      const selectedShape = possibleShapes[Math.floor(Math.random() * possibleShapes.length)];
      const position = {
        x: Math.random() * bodyWidth,
        y: Math.random() * bodyHeight,
      }

      console.log('s', selectedShape);

      ctx.lineWidth = 4;

      ctx.strokeStyle = 'red';
      ctx.beginPath();
      ctx.arc(position.x, position.y, shapeSize, 0, 2 * Math.PI, true);
      ctx.closePath();
      ctx.stroke();
    }
  }
});
