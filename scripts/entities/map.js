import { Character } from "./character.js";

export class Map extends Character {
  width = 0;
  height = 0;
  context = null;
  backgroundColor = "";

  constructor({ width, height, backgroundColor = "#5c6b79", context }) {
    super({ x: 0, y: 0 });

    this.width = width;
    this.height = height;
    this.backgroundColor = backgroundColor;
    this.context = context;
  }

  draw() {
    // this._drawStreets();
  }

  _drawStreets() {
    let streetSize = 200;

    let streetBorder = 2;

    function _drawHorizontally(that) {
      let streetWidth = (that.width - streetSize) / 2;

      that._drawStreet(
        { streetSize, streetWidth },
        { x: 0, y: (that.height - streetSize) / 2 }
      );

      that._drawStreet(
        { streetSize, streetWidth },
        {
          x: streetWidth + streetSize,
          y: (that.height - streetSize) / 2,
        }
      );

      that._drawStreetMarks(streetWidth);

      that._drawStreetMarks(streetWidth, {
        x: streetWidth + streetSize,
        y: 0,
      });
    }

    function _drawVertically(that) {
      let streetWidth = (that.height - streetSize) / 2;

      that._drawStreet(
        { streetSize: streetWidth, streetWidth: streetSize },
        { x: (that.width - streetSize) / 2, y: 0 }
      );

      that._drawStreet(
        { streetSize: streetWidth, streetWidth: streetSize },
        {
          x: (that.width - streetSize) / 2,
          y: streetWidth + streetSize,
        }
      );

      that._drawStreetMarks(
        streetWidth,
        {
          x: that.height / 2,
          y: 0,
        },
        false
      );

      that._drawStreetMarks(
        streetWidth,
        {
          x: that.height / 2,
          y: streetWidth + streetSize,
        },
        false
      );
    }

    function _drawJunction(that) {
      that.context
        .rect(streetSize + streetBorder, streetSize + streetBorder)
        .fill({ color: "#383838" })
        .move(
          (that.width - streetSize - streetBorder) / 2,
          (that.height - streetSize - streetBorder) / 2
        );
    }

    _drawHorizontally(this);
    _drawVertically(this);
    _drawJunction(this);
  }

  _drawStreet({ streetWidth, streetSize, streetBorder = 2 }, { x = 0, y = 0 }) {
    this.context
      .rect(streetWidth, streetSize)
      .fill({ color: "#383838" })
      .move(x, y)
      .stroke({ color: "#fff", width: streetBorder });
  }

  _drawStreetMarks(
    streetWidth,
    initialPosition = { x: 0, y: 0 },
    isHorizotal = true
  ) {
    let mark = { width: 27, height: 80 };

    let space = 35;

    let fullSpace = space * 2;

    let marksQuantity = Math.round(streetWidth / (mark.height + fullSpace));

    for (let i = 0; i < marksQuantity; i++) {
      let color = "#fff";
      if (isHorizotal) {
        this.context
          .rect(mark.height, mark.width)
          .fill({ color })
          .move(
            space + initialPosition.x,
            (this.height - mark.height / 2) / 2 + initialPosition.y
          );
      } else {
        this.context
          .rect(mark.width, mark.height)
          .fill({ color })
          .move(this.width / 2 - mark.width / 2, space + initialPosition.y);
      }

      space += fullSpace + mark.height;
    }
  }
}
