import { Character } from "./character.js";

export class Car extends Character {
  color = "";
  size = { width: 100, height: 100 };

  canvas = null;

  constructor({ x, y, context, color, size = { width: 100, height: 100 } }) {
    super({ x, y, context });

    this.color = color;
    this.size = size;
  }

  draw() {
    let colors = ["green", "yellow", "red", "white", "pink"];

    if (colors.findIndex((color) => color === this.color) === -1) {
      throw new Error(`Car color not found ${this.color}`);
    }

    this.canvas = this.context
      .image(`./cars/${this.color}.svg`)
      .size(this.size.width, this.size.height)
      .move(this.position.x, this.position.y);
  }

  turnOn() {
    function loop(that) {
      setTimeout(() => {
        that.position.x += 1;

        that.canvas.move(that.position.x, that.position.y);

        loop(that);
      }, 50);
    }

    // loop(this);
  }

  drive({ up, down, left, right }) {
    let velocity = 5;

    if (up) this.position.x += velocity;

    if (down) this.position.x -= velocity;

    if (left) this.canvas.rotate(-10);

    if (right) this.canvas.rotate(10);

    this.canvas.move(this.position.x, this.position.y);
  }
}
