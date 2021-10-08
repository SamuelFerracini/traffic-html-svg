import { Character } from "./character.js";

export class Asteroid extends Character {
  color = "";
  size = { width: 0, height: 0 };
  canvas = null;

  constructor({ x, y, context, size = { width: 50, height: 50 } }) {
    super({ x, y, context });

    this.size = size;
  }

  update() {}

  draw() {
    this.canvas = this.context
      .image(`./images/objects/asteroid.svg`)
      .size(this.size.width, this.size.height)
      .move(this.position.x, this.position.y);
  }
}
