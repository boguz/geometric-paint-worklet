// src/types.ts
var PossibleShape = /* @__PURE__ */ ((PossibleShape2) => {
  PossibleShape2["CIRCLE"] = "CIRCLE";
  PossibleShape2["TRIANGLE"] = "TRIANGLE";
  PossibleShape2["SQUARE"] = "SQUARE";
  PossibleShape2["PENTAGON"] = "PENTAGON";
  PossibleShape2["HEXAGON"] = "HEXAGON";
  return PossibleShape2;
})(PossibleShape || {});

// src/basicShape.ts
var BasicShape = class {
  constructor(ctx, size, position) {
    this.ctx = ctx;
    this.size = size;
    this.position = position;
  }
};

// src/ShapeCircle.ts
var ShapeCircle = class extends BasicShape {
  constructor(ctx, size, position) {
    super(ctx, size, position);
    this.draw();
  }
  draw() {
    this.ctx.arc(this.position.x, this.position.y, this.size / 2, 0, 2 * Math.PI);
  }
};

// src/ShapePolygon.ts
var ShapePolygon = class extends BasicShape {
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
    this.ctx.moveTo(this.size / 2 * Math.cos(0), this.size / 2 * Math.sin(0));
    for (let i = 0; i < this.sidesCount; i++) {
      this.ctx.lineTo(this.size / 2 * Math.cos(i * 2 * Math.PI / this.sidesCount), this.size / 2 * Math.sin(i * 2 * Math.PI / this.sidesCount));
    }
    this.ctx.closePath();
    this.ctx.rotate(-this.radians);
    this.ctx.translate(-this.position.x, -this.position.y);
  }
};

// src/utils.ts
function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// src/geometric-paint-worklet.ts
registerPaint("geometricPaintWorklet", class {
  static get inputProperties() {
    return [
      "--gpw-number-of-shapes",
      "--gpw-shape-size",
      "--gpw-line-width",
      "--gpw-possible-colors",
      "--gpw-fill-shapes",
      "--gpw-opacity"
    ];
  }
  paint(ctx, geom, props) {
    const numberOfShapes = parseInt(props.get("--gpw-number-of-shapes")) || 12;
    const shapeSize = parseInt(props.get("--gpw-shape-size")) || 40;
    const lineWidth = parseInt(props.get("--gpw-line-width")) || 4;
    const defaultPossibleColors = ["#FFF59D", "#FFAB91", "#80DEEA", "#E57373"];
    const fillShapes = props.get("--gpw-fill-shapes").toString().trim() === "true" || false;
    const opacity = parseFloat(props.get("--gpw-opacity")) || 1;
    const possibleColors = props.get("--gpw-possible-colors").length > 0 ? JSON.parse(props.get("--gpw-possible-colors")) : defaultPossibleColors;
    const possibleShapes = [
      PossibleShape.CIRCLE,
      PossibleShape.TRIANGLE,
      PossibleShape.SQUARE,
      PossibleShape.PENTAGON,
      PossibleShape.HEXAGON
    ];
    const elWidth = geom.width;
    const elHeight = geom.height;
    ctx.globalAlpha = opacity;
    for (let i = 0; i < numberOfShapes; i++) {
      const rotation = randomIntFromInterval(0, 360);
      const selectedShape = possibleShapes[Math.floor(Math.random() * possibleShapes.length)];
      const position = {
        x: Math.random() * elWidth,
        y: Math.random() * elHeight
      };
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
